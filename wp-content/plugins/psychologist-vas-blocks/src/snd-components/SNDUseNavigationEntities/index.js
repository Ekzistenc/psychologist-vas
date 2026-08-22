import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default function SNDUseNavigationEntities() {
  const { menus, isResolvingMenus, hasResolvedMenus } = useSelect(
    (select) => {
      const { getMenus, isResolving, hasFinishedResolution } =
        select(coreStore);

      const menusParameters = [{ per_page: -1, context: 'view' }];

      return {
        menus: getMenus(...menusParameters),
        isResolvingMenus: isResolving('getMenus', menusParameters),
        hasResolvedMenus: hasFinishedResolution(
          'getMenus',
          menusParameters
        ),
      };
    },
    []
  );

  return {
    menus,
    isResolvingMenus,
    hasResolvedMenus,
    hasMenus: !!(hasResolvedMenus && menus?.length),
  };
}
