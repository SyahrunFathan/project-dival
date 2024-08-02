import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IonIcon} from '../../Components';
import {COLORS, ILLogoPMI} from '../../Assets';
import {useDispatch} from 'react-redux';
import {getPengantaranBySearch} from '../../Utils/Apis';
import {GetItem, RemoveItem} from '../../Utils/Storage';
import {RemoveToken} from '../../Features/authSlice';

const HistoryScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const AmbilDataSearch = async () => {
    const profile = await GetItem('profile');
    try {
      const response = await getPengantaranBySearch(
        profile?.data?.userId,
        search,
      );
      const data = response?.data?.response;

      // Mengelompokkan data
      const groupedData = data.reduce((acc, curr) => {
        const hospital = curr.rs.nama_rs;
        if (!acc[hospital]) {
          acc[hospital] = 0;
        }
        acc[hospital] += curr.total_darah;
        return acc;
      }, {});

      // Mengubah data menjadi format yang siap ditampilkan
      const formattedData = Object.keys(groupedData).map(hospital => ({
        hospital,
        total: groupedData[hospital],
      }));

      // Set data yang telah diformat ke state
      setData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleRefresh = () => {
    setRefresh(true);
    AmbilDataSearch();
    setRefresh(false);
  };

  useEffect(() => {
    AmbilDataSearch();
  }, [search]);

  const HandleLogout = async () => {
    const profile = await GetItem('profile');
    try {
      const response = await dispatch(RemoveToken({id: profile?.data?.userId}));
      if (response?.payload?.status === 200) {
        await RemoveItem('profile');
        navigation.replace('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={HandleRefresh} />
        }>
        <View style={{marginHorizontal: 20, marginVertical: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <View style={{position: 'absolute', left: 12}}>
              <IonIcon name={'search-outline'} size={24} color={COLORS.grey} />
            </View>
            <TextInput
              placeholder="Cari"
              style={{
                borderWidth: 1.5,
                width: '100%',
                paddingLeft: 40,
                paddingRight: 20,
                fontSize: 20,
                borderRadius: 8,
                borderColor: COLORS.grey,
              }}
              placeholderTextColor={COLORS.grey}
              value={search}
              onChangeText={text => setSearch(text)}
            />
          </View>
          {data.length > 0 ? (
            data.map((item, index) => (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  backgroundColor: COLORS.white,
                  borderRadius: 20,
                  marginVertical: 7,
                  borderColor: COLORS.grey,
                }}>
                <View
                  style={{
                    backgroundColor: COLORS.grey,
                    borderTopStartRadius: 20,
                    borderTopEndRadius: 20,
                  }}>
                  <Image
                    source={ILLogoPMI}
                    style={{
                      width: '100%',
                      height: 100,
                      objectFit: 'contain',
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  />
                </View>
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      borderBottomWidth: 4,
                      paddingBottom: 10,
                      borderColor: COLORS.primary,
                    }}>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 22,
                        fontWeight: '700',
                      }}>
                      {item?.hospital}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        fontWeight: '700',
                      }}>
                      {item?.total} Darah
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={{alignItems: 'center', marginTop: 50}}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: '700',
                  fontStyle: 'italic',
                  color: COLORS.grey,
                }}>
                Riwayat Masih Kosong!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={HandleLogout}
        style={{
          position: 'absolute',
          padding: 10,
          borderWidth: 1,
          bottom: 30,
          right: 10,
          backgroundColor: COLORS.red,
          borderRadius: 50,
          borderColor: COLORS.grey,
        }}>
        <IonIcon name={'log-out-outline'} size={28} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HistoryScreen;
