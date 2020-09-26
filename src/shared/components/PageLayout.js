import React, { useCallback, useState } from 'react';
import en from '@shopify/polaris/locales/en.json';

import { AppProvider, Frame, Navigation, TopBar, Modal, TextContainer } from '@shopify/polaris';
import {
  LogOutMinor,
  SettingsMinor
} from '@shopify/polaris-icons';
import store from "../redux/Store";
import { LoginAction } from '../../modules/authentication';
import { StringUtils } from "../../utils";
import { useHistory } from "react-router-dom";

export default function PageLayout(props) {

  // history is used to redirect routing
  const history = useHistory();

  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );

  const routeProfile = useCallback(
    () => {
      history.push("/user/profile");
    }
  );

  const signOut = useCallback(
    () => {
      store.dispatch(LoginAction.logOut());
      localStorage.setItem("token", "");
      history.push("/");
    }, []
  );

  const userMenuActions = [
    {
      items: [
        {
          icon: SettingsMinor,
          content: 'Settings',
          onAction: () => routeProfile()
        },
        {
          icon: LogOutMinor,
          content: 'Sign Out',
          onAction: () => signOut()
        }
      ],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={props.userName}
      detail={StringUtils.roleToString(props.userType)}
      initials={props.userName[0]}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        separator
        title={props.sideBarTitle ? props.sideBarTitle : "Blood Donation"}
        items={props.navigationArray ? props.navigationArray : []}
      />
    </Navigation>
  );

  const modalRouteMarkup = (
    props.expectedUserType ?
      <Modal
        open={props.expectedUserType !== props.userType}
        title="Oops! What are you looking for?"
        primaryAction={{
          content: "Sign in with Different Account",
          onAction: () => signOut()
        }}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              You are signing in with account type of {props.userType.toUpperCase()}.
                            To access this page, you are required to have an account with
                            type {props.expectedUserType.toUpperCase()}.
                        </p>
          </TextContainer>
        </Modal.Section>
      </Modal> : null
  );


  const theme = {
    // colors: {
    //     topBar: {
    //         background: '#DE3618',
    //     },
    //
    // },
    colors: {
      surface: '#111213',
      onSurface: '#111213',
      interactive: '#DE3618',
      secondary: '#111213',
      primary: '#DE3618',
      critical: '#d82c0d',
      warning: '#ffc453',
      highlight: '#DE3618',
      success: '#008060',
      decorative: '#ffc96b',
    },
    logo: {
      width: 124,
      topBarSource:
        "https://previews.123rf.com/images/3t0n4k/3t0n4k1605/3t0n4k160500033/57480630-blood-donation-logo-on-a-white-background.jpg",
      contextualSaveBarSource:
        'https://previews.123rf.com/images/3t0n4k/3t0n4k1605/3t0n4k160500033/57480630-blood-donation-logo-on-a-white-background.jpg',
      accessibilityLabel: 'Blood Donation',
    },
  };

  return (
    <AppProvider theme={theme} i18n={en} features={{ newDesignLanguage: true }}>
      <div>
        {props.pageTitle ? props.pageTitle : "Blood Donation"}
      </div>
      {/* <Head>
                <title>{props.pageTitle ? props.pageTitle : "Blood Donation"}</title>
            </Head> */}
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
      >
        {props.children}
        {modalRouteMarkup}
      </Frame>
    </AppProvider>
  );
}
