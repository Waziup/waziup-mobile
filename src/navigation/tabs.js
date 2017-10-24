/**
 * Tabs Scenes
 *
 * WaziApp
 * https://github.com/Waziup/waziup-mobile
 */
import React from 'react';
import { Scene } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Components
import { TabIcon } from '@ui/';
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer';

// Scenes
import Placeholder from '@components/general/Placeholder';
import Error from '@components/general/Error';
import StyleGuide from '@containers/StyleGuideView';
//import Recipes from '@containers/recipes/Browse/BrowseContainer';
import FarmView from '@containers/farms/FarmView';
import FarmMap from '@containers/farms/FarmMap';

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  renderLeftButton: () => <NavbarMenuButton />,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};

/* Routes ==================================================================== */
const scenes = (
  <Scene key={'tabBar'} tabs tabBarIconContainerStyle={AppStyles.tabbar} pressOpacity={0.95}>
    <Scene
      {...navbarPropsTabs}
      key={'farm'}
      title={'Farm'}
      icon={props => TabIcon({ ...props, icon: 'search' })}
    >
      <Scene
        {...navbarPropsTabs}
        key={'farmPage'}
        component={FarmView}
        title={'Farm:'}
        analyticsDesc={'Farm:view'}
      />
      {/*<Scene
        {...AppConfig.navbarProps}
        key={'recipeView'}
        component={RecipeView}
        getTitle={props => ((props.title) ? props.title : 'View Recipe')}
        analyticsDesc={'RecipeView: View Recipe'}
      />*/}
    </Scene>

    {/*<Scene
      key={'timeline'}
      {...navbarPropsTabs}
      title={'Coming Soon'}
      component={Placeholder}
      icon={props => TabIcon({ ...props, icon: 'timeline' })}
      analyticsDesc={'Placeholder: Coming Soon'}
    />

    <Scene
      key={'error'}
      {...navbarPropsTabs}
      title={'Example Error'}
      component={Error}
      icon={props => TabIcon({ ...props, icon: 'error' })}
      analyticsDesc={'Error: Example Error'}
    />*/}

    <Scene
      key={'Map'}
      {...navbarPropsTabs}
      title={'Farm Map'}
      component={FarmMap}
      icon={props => TabIcon({ ...props, icon: 'map' })}
      analyticsDesc={'Farm Map:MapView'}
    />
    {/*<Scene
      key={'Map'}
      {...navbarPropsTabs}
      title={'Style guide'}
      component={StyleGuide}
      icon={props => TabIcon({ ...props, icon: 'map' })}
      analyticsDesc={'Farm Map:MapView'}
    />*/}
  </Scene>
);

export default scenes;
