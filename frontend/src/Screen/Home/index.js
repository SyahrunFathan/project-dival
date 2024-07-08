import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  COLORS,
  ILDefaultPhoto,
  ILRouteIcon,
  ILTaskIcon,
  ILWelcomePhoto,
} from '../../Assets';
import {useDispatch} from 'react-redux';
import {PatchPengantaranByUser} from '../../Features/pengantaranSlice';
import {GetItem} from '../../Utils/Storage';
import {WebView} from 'react-native-webview';
import Map from '../../../android/app/src/main/assets/Map.html';

const HomeSecreen = () => {
  const [startCoords, setStartCoords] = useState({lat: null, lon: null});
  const [endCoords, setEndCoords] = useState({lat: null, lon: null});
  const [profile, setProfile] = useState([]);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const webViewRef = useRef(null);

  const AmbilData = async () => {
    try {
      const responseProfile = await GetItem('profile');
      const profile = responseProfile?.data;
      setProfile(profile);

      const response = await dispatch(
        PatchPengantaranByUser({id: profile?.userId}),
      );
      const data = response?.payload?.data;
      setData(data);

      if (data && data.length > 0) {
        const endLat = parseFloat(data[0]?.rs?.latitude);
        const endLon = parseFloat(data[0]?.rs?.longitude);

        const startLat = -0.9019335;
        const startLon = 119.8755552;
        setStartCoords({lat: startLat, lon: startLon});
        setEndCoords({lat: endLat, lon: endLon});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetRoute = () => {
    setStatus('progress1');
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.setWaypoints(${JSON.stringify(startCoords)}, ${JSON.stringify(
        endCoords,
      )});
      `);
    }
  };

  const handleSaveProses = () => {};

  useEffect(() => {
    AmbilData();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          padding: 20,
          backgroundColor: COLORS.primary,
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
        }}>
        <Text
          style={{
            marginTop: 20,
            color: COLORS.white,
            fontSize: 24,
            fontWeight: '700',
          }}>
          Dashboard
        </Text>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View>
            <Text
              style={{color: COLORS.white, fontSize: 20, fontWeight: '600'}}>
              Mr. {profile?.nama}
            </Text>
            <Text
              style={{fontSize: 16, color: COLORS.white, fontWeight: '300'}}>
              Selamat Datang Megachan
            </Text>
          </View>
          <View>
            <Image source={ILDefaultPhoto} style={{borderRadius: 8}} />
          </View>
        </View>
      </View>
      {/* Not Data */}
      {data?.length > 0 ? (
        <View style={{flex: 1}}>
          <WebView
            ref={webViewRef}
            source={Map} // Untuk Android
            style={{height: '100%'}}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
          <View
            style={{
              bottom: 20,
              position: 'absolute',
              padding: 10,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.grey,
                width: '98%',
                padding: 10,
                backgroundColor: COLORS.primary,
                borderRadius: 8,
                gap: 20,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 40,
                    padding: 7,
                  }}
                  onPress={status === '' ? handleGetRoute : handleSaveProses}>
                  <Image
                    source={status === '' ? ILRouteIcon : ILTaskIcon}
                    style={{width: 60, height: 60}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 20,
                  gap: 10,
                  maxWidth: '100%',
                  flexWrap: 'wrap',
                }}>
                {data?.map((item, index) => (
                  <View
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical: 10,
                      borderRadius: 8,
                      backgroundColor: COLORS.grey,
                      elevation: 0.5,
                      width: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    key={index}>
                    <Text
                      style={{
                        color: COLORS.red,
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      {item?.darah?.jenis_darah}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            gap: 40,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '700',
              color: COLORS.black,
            }}>
            Menunggu Data Distribusi
          </Text>
          <Image source={ILWelcomePhoto} />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '700',
              color: COLORS.black,
            }}>
            Data Masih Kosong
          </Text>
        </View>
      )}
      {/* Is Data */}
    </SafeAreaView>
  );
};

export default HomeSecreen;
