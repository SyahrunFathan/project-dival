import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../Assets';
import {IonIcon, LoadingComponent} from '../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {Login} from '../../Features/authSlice';
import {SetItem} from '../../Utils/Storage';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({
    username: '',
    password: '',
  });
  const {isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const HandleLogin = () => {
    if (username === '')
      return setFormError({username: 'Username tidak boleh kosong!'});
    if (password === '')
      return setFormError({password: 'Password tidak boleh kosong!'});
    dispatch(Login({username: username, password: password})).then(
      async res => {
        if (res?.payload?.status === 200) {
          await SetItem('profile', res?.payload?.data);
          navigation.replace('Main');
        } else {
          if (res?.payload?.error === 'username')
            return setFormError({username: res?.payload?.message});
          if (res?.payload?.error === 'password')
            return setFormError({password: res?.payload?.message});
        }
      },
    );
  };
  return (
    <SafeAreaView style={styles.STContainer}>
      <View style={styles.STContent}>
        <Text style={styles.STTextHeader}>Login</Text>
        <View style={styles.STContentForm}>
          <View style={{gap: 15}}>
            <Text style={styles.STTextLabel}>Username</Text>
            <View style={styles.STForm}>
              <TextInput
                placeholder="Masukkan Username Anda"
                style={[
                  styles.STFormInput,
                  formError?.username && {borderColor: COLORS.red},
                ]}
                placeholderTextColor={COLORS.grey}
                value={username}
                onChangeText={text => setUsername(text)}
              />
              <View style={styles.STFormIcon}>
                <IonIcon name={'person-outline'} size={22} />
              </View>
            </View>
            {formError?.username && (
              <Text style={{color: COLORS.red}}>{formError?.username}</Text>
            )}
          </View>
          <View style={{gap: 15, marginTop: 20}}>
            <Text style={styles.STTextLabel}>Password</Text>
            <View style={styles.STForm}>
              <TextInput
                placeholder="Masukkan Password Anda"
                style={[
                  styles.STFormInput,
                  formError?.password && {borderColor: COLORS.red},
                ]}
                placeholderTextColor={COLORS.grey}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.STFormIcon}>
                {showPassword ? (
                  <IonIcon name={'eye-outline'} size={22} />
                ) : (
                  <IonIcon name={'eye-off-outline'} size={22} />
                )}
              </TouchableOpacity>
            </View>
            {formError?.password && (
              <Text style={{color: COLORS.red}}>{formError?.password}</Text>
            )}
          </View>
          <TouchableOpacity onPress={HandleLogin} style={styles.STButtonLogin}>
            <Text style={styles.STTextButton}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && <LoadingComponent />}
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  STContainer: {
    flex: 1,
  },
  STContent: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 81,
  },
  STTextHeader: {
    fontWeight: '700',
    fontSize: 24,
    color: COLORS.black,
  },
  STContentForm: {
    marginTop: 30,
  },
  STTextLabel: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '700',
  },
  STForm: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  STFormInput: {
    borderWidth: 1,
    paddingLeft: 15,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderColor: COLORS.grey,
    elevation: 1.5,
    width: '100%',
    fontSize: 18,
    paddingRight: 38,
  },
  STFormIcon: {
    position: 'absolute',
    right: 12,
  },
  STButtonLogin: {
    marginTop: 100,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 0.5,
    backgroundColor: COLORS.primary,
  },
  STTextButton: {
    color: COLORS.white,
    fontSize: 22,
  },
});
