const AuthenticationRouteUtils = {
  stringRouteByRole: (role) => {
    console.log(role);
    switch (role) {
      case "donor":
        return "/donor/event";
      case "organizer":
        return "/organizer/manage_event";
      case "red_cross":
        return "/red_cross/pendingEvents";
      case "hospital":
        return "/hospital/manage_blood_order";
      default:
        return "/";
    }
  },
};

export default AuthenticationRouteUtils;
