import 'react-native-gesture-handler';
import { View, Easing } from 'react-native';
import {
  useFonts,
  HankenGrotesk_400Regular,
  HankenGrotesk_500Medium,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold,
  HankenGrotesk_800ExtraBold,
  HankenGrotesk_900Black,
} from '@expo-google-fonts/hanken-grotesk';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from './src/theme';
import RevTabBar from './src/components/RevTabBar';
import SplashScreen from './src/screens/SplashScreen';
import PasscodeScreen from './src/screens/PasscodeScreen';
import HomeScreen from './src/screens/HomeScreen';
import InvestScreen from './src/screens/InvestScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import CryptosScreen from './src/screens/CryptosScreen';
import RevPointsScreen from './src/screens/RevPointsScreen';
import TransactionDetailScreen from './src/screens/TransactionDetailScreen';
import AllTransactionsScreen from './src/screens/AllTransactionsScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <RevTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        // Effet de slide horizontal au changement d'onglet
        animation: 'shift',
        transitionSpec: {
          animation: 'timing',
          config: { duration: 220, easing: Easing.out(Easing.cubic) },
        },
        sceneStyleInterpolator: ({ current }) => ({
          sceneStyle: {
            opacity: current.progress.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [0, 1, 0],
            }),
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [-90, 0, 90],
                }),
              },
            ],
          },
        }),
      }}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Investir" component={InvestScreen} />
      <Tab.Screen name="Virements" component={PaymentsScreen} />
      <Tab.Screen name="Cryptos" component={CryptosScreen} />
      <Tab.Screen name="RevPoints" component={RevPointsScreen} />
    </Tab.Navigator>
  );
}

const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.bg, card: colors.bg, text: colors.text, border: colors.border, primary: colors.primary },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Aeonik: require('./assets/fonts/Aeonik-Regular.otf'),
    'Aeonik-Light': require('./assets/fonts/Aeonik-Light.otf'),
    'Aeonik-Bold': require('./assets/fonts/Aeonik-Bold.otf'),
    'NimbusSans-Bold': require('./assets/fonts/NimbusSanL-Bol.otf'),
    'NimbusSans-Regular': require('./assets/fonts/NimbusSanL-Reg.otf'),
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
    HankenGrotesk_700Bold,
    HankenGrotesk_800ExtraBold,
    HankenGrotesk_900Black,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.bg }} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="light" />
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}
        >
          <RootStack.Screen name="Splash" component={SplashScreen} />
          <RootStack.Screen name="Passcode" component={PasscodeScreen} />
          <RootStack.Screen name="Main" component={MainTabs} />
          <RootStack.Screen name="AllTransactions" component={AllTransactionsScreen} />
          <RootStack.Screen name="Analytics" component={AnalyticsScreen} />
          <RootStack.Screen
            name="TransactionDetail"
            component={TransactionDetailScreen}
            options={{ presentation: 'modal' }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
