import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11.1", (api) => {
  let exclusionList = settings.exclusions.split("|");
  api.addNavigationBarItem({
    name: "unanswered",
    displayName: I18n.t(themePrefix("unanswered.title")),
    title: I18n.t(themePrefix("unanswered.help")),
    customFilter: (category, args, router) => {
      return exclusionList.indexOf(router.currentURL) < 0;
    },
    customHref: function (category, args, router) {
      console.log(args);
      let routeName =
        args.filterType === "categories"
          ? "discovery.latest"
          : router.currentRouteName;
      return router.urlFor(routeName, { queryParams: { max_posts: 1 } });
    },
    forceActive: (category, args) => {
      const queryParams = args.currentRouteQueryParams;

      return queryParams && queryParams["max_posts"] === "1";
    },
  });
});
