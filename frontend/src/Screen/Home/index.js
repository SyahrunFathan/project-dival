import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, ILMarker, ILRouteIcon, ILWelcomePhoto} from '../../Assets';
import {useDispatch, useSelector} from 'react-redux';
import {
  PatchPengantaranByUser,
  UpdateStatusPengantaran,
} from '../../Features/pengantaranSlice';
import {GetItem} from '../../Utils/Storage';
import MapboxGL from '@rnmapbox/maps';
import axios from 'axios';
import {LoadingComponent} from '../../Components';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic3lhaHJ1bjE5IiwiYSI6ImNseHZheW5ndDFxcjUya3B4MTF6cGh3djgifQ.lndfFCRzCfSUdLfBXbaoUg',
);

const HomeSecreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [route, setRoute] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const startCoords = [119.87812991231158, -0.9018363186733893];
  const {isLoading} = useSelector(state => state.pengantaran);

  const AmbilData = async () => {
    try {
      const responseProfile = await GetItem('profile');
      const profile = responseProfile?.data;

      const response = await dispatch(
        PatchPengantaranByUser({id: profile?.userId}),
      );
      const data = response?.payload?.data;
      setData(data);

      if (data.length > 0) {
        const fetchDirection = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.join(
            ',',
          )};${data[0]?.rs?.longitude},${
            data[0]?.rs?.latitude
          }?geometries=geojson&access_token=pk.eyJ1Ijoic3lhaHJ1bjE5IiwiYSI6ImNseHZheW5ndDFxcjUya3B4MTF6cGh3djgifQ.lndfFCRzCfSUdLfBXbaoUg`,
        );

        const routedata = fetchDirection?.data?.routes[0]?.geometry;
        setRoute(routedata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AmbilData();
  }, []);

  const HandleRefresh = () => {
    setRefresh(true);
    AmbilData();
    setRefresh(false);
  };

  const HandleButtonSelesai = async () => {
    try {
      const profile = await GetItem('profile');
      const response = await dispatch(
        UpdateStatusPengantaran({id: profile?.data?.userId}),
      );
      if (response?.payload?.status === 200) {
        navigation.replace('Success');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <MapboxGL.MapView
        style={{flex: 1}}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}>
        <MapboxGL.Camera zoomLevel={13} centerCoordinate={startCoords} />

        {data.length > 0 && (
          <>
            <MapboxGL.PointAnnotation
              id="markerAwal"
              coordinate={startCoords}
            />

            {route && (
              <MapboxGL.ShapeSource id="routeSource" shape={route}>
                <MapboxGL.LineLayer
                  id="routeLine"
                  style={{
                    lineWidth: 5,
                    lineJoin: 'round',
                    lineCap: 'round',
                    lineColor: COLORS.primary,
                  }}
                />
              </MapboxGL.ShapeSource>
            )}
            <MapboxGL.PointAnnotation
              id="markerAwal"
              coordinate={[data[0]?.rs?.longitude, data[0]?.rs?.latitude]}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: '#00FF00', // Warna marker merah
                  borderRadius: 15,
                  borderColor: '#FFFFFF',
                  borderWidth: 2,
                }}
              />
            </MapboxGL.PointAnnotation>
          </>
        )}
      </MapboxGL.MapView>
      <View
        style={{
          borderWidth: 1,
          height: 300,
          padding: 20,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          backgroundColor: COLORS.white,
          borderColor: COLORS.grey,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={HandleRefresh} />
          }>
          {data.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text
                style={{color: COLORS.black, fontSize: 20, fontWeight: '700'}}>
                Jarak: {data[0]?.rs?.graph[0]?.jarak}
              </Text>
              <Text
                style={{color: COLORS.black, fontSize: 20, fontWeight: '700'}}>
                Waktu: {data[0]?.rs?.graph[0]?.waktu}
              </Text>
            </View>
          )}
          {data.length > 0 ? (
            data.map((item, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 20,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.grey,
                }}
                key={index}>
                <View
                  style={{
                    maxWidth: '20%',
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image source={ILRouteIcon} style={{width: 40, height: 40}} />
                </View>
                <View style={{maxWidth: '72%', width: '72%'}}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '700',
                      color: COLORS.black,
                    }}>
                    {item?.rs?.nama_rs}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 26,
                        fontWeight: '700',
                        color: COLORS.red,
                      }}>
                      {item?.darah?.jenis_darah}
                    </Text>
                    <Text
                      style={{
                        fontSize: 26,
                        fontWeight: '700',
                        color: COLORS.primary,
                      }}>
                      {item?.total_darah}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Text
                style={{color: COLORS.black, fontWeight: 'bold', fontSize: 26}}>
                Oopps....
              </Text>
              <Image
                source={ILWelcomePhoto}
                style={{width: 100, height: 100}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.black,
                  fontWeight: '700',
                  fontSize: 20,
                }}>
                Maaf, Pengantaran Anda Tidak Tersedia!
              </Text>
            </View>
          )}
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 100,
          }}>
          {data.length > 0 ? (
            <TouchableOpacity
              onPress={HandleButtonSelesai}
              style={{
                borderWidth: 1,
                width: 200,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
                borderRadius: 12,
                backgroundColor: COLORS.primary,
                borderColor: COLORS.grey,
                elevation: 1,
              }}>
              <Text
                style={{color: COLORS.white, fontSize: 20, fontWeight: '700'}}>
                Selesai
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('History')}
              style={{
                borderWidth: 1,
                width: 200,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
                borderRadius: 12,
                backgroundColor: COLORS.primary,
                borderColor: COLORS.grey,
                elevation: 1,
              }}>
              <Text
                style={{color: COLORS.white, fontSize: 20, fontWeight: '700'}}>
                Go Riwayat
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isLoading && <LoadingComponent />}
    </SafeAreaView>
  );
};

export default HomeSecreen;
