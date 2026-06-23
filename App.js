import 'react-native-gesture-handler';
import { Text, View } from 'react-native';
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
import { Ionicons } from '@expo/vector-icons';

import { colors } from './src/theme';
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

const TAB_ICONS = {
  Accueil: 'home',
  Investir: 'trending-up',
  Virements: 'swap-horizontal',
  Cryptos: 'logo-bitcoin',
  RevPoints: 'diamond',
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.subtext,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }) => {
          // Onglet Accueil : monogramme "R" de Revolut
          if (route.name === 'Accueil') {
            return (
              <Text style={{ color, fontSize: size + 4, fontFamily: 'Aeonik-Bold', letterSpacing: -1 }}>
                R
              </Text>
            );
          }
          const base = TAB_ICONS[route.name];
          // les icônes "logo-*" n'ont pas de variante -outline
          const hasOutline = base !== 'logo-bitcoin';
          const name = focused || !hasOutline ? base : `${base}-outline`;
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
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
