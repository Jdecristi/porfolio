//Imports
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/libs/createEmotionCache';

//Types
interface MyAppProps extends AppProps {
   emotionCache?: EmotionCache;
}

const clientSideCache = createEmotionCache();

const MyApp: React.FC<MyAppProps> = (props) => {
   const { Component, pageProps, emotionCache = clientSideCache } = props;
   return (
      <Provider store={store}>
         <CacheProvider value={emotionCache}>
            <Component {...pageProps} />
         </CacheProvider>
      </Provider>
   );
};

export default MyApp;
