import axios from "axios";

const url = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/auth/me",
  GET_USER: "/auth",
  UPDATE_PASSWORD: "/auth/change_password",
  GET_BLOOD_EVENTS: "/event/get_events",
  GET_BLOOD_EVENTS_DONORS: "/red_cross/get_approved_events",
  ADD_BLOOD_EVENT: "/event/create_event",
  GET_BLOOD_EVENT: "/event/search_event",
  DELETE_BLOOD_EVENTS: "/event/delete_events",
  UPDATE_BLOOD_EVENT: "/event/update_event",
  GET_REGISTERED_BLOOD_EVENT: "/blood/blood_form",
  POST_REGISTER_BLOOD_EVENT: "/blood/blood_form",
  UPDATE_PROFILE: "/auth/update",
  GET_PENDING_EVENT: "/red_cross/get_pending_events",
  POST_ACCEPT_EVENT: "/red_cross/accepted_event",
  POST_REJECT_EVENT: "/red_cross/reject_event",
  POST_ACCEPT_ORDER: "/red_cross/accepted_order",
  GET_PENDING_ORDER: "/red_cross/get_pending_orders",
  POST_REJECT_ORDER: "/red_cross/reject_order",
  POST_ACCEPT_DONATION: "/red_cross/store",
  POST_REJECT_DONATION: "/red_cross/reject_donation",
  GET_BLOOD_STORE: "/red_cross/get_store",
  POST_TESTED_DONATION: "/red_cross/test_blood",
  GET_BLOOD_DONATION: "/red_cross/get_blood_donation",
  GET_UNTESTED_BLOOD_DONATION: "/red_cross/get_untested_blood_donation",
  GET_ACCEPTED_EVENTS: "/red_cross/get_accepted_events",
  GET_ACCEPTED_ORDERS: "/red_cross/get_accepted_orders",
  GET_ACCEPTED_DONATIONS: "/red_cross/get_stored_blood_donations",
  GET_BLOOD_ORDER: "/blood_order/get_orders",
  ADD_BLOOD_ORDER: "/blood_order/create_order",
  GET_BLOOD_ORDER_ID: "/blood_order/get_order/",
  UPDATE_BLOOD_ORDER_INFO: "/blood_order/update_order_info/",
  UPDATE_BLOOD_ORDER_STATUS: "/blood_order/update_order_status/",
  SEND_ORDER: "/blood_order/send_order/",
  GET_SENT_BLOOD_ORDER: "/blood_order/get_sent_orders",
  GET_UNSENT_BLOOD_ORDER: "/blood_order/get_unsent_orders",
  DELETE_BLOOD_ORDER: "/blood_order/delete_order/",
  VIEW_DONATION_LIST: "/red_cross/view_donation_list",
  GET_DONORS: "/red_cross/get_donors",
  GET_ORGANIZERS: "/red_cross/get_organizers",
  GET_HOSPITALS: "/red_cross/get_hospitals",
  GET_DONORS_DETAIL: "/red_cross/get_donors_detail",
  GET_HOSPITALS_DETAIL: "/red_cross/get_hospitals_detail",
  GET_ORGANIZERS_DETAIL: "/red_cross/get_organizers_detail",
  GET_ACCEPTED_ORDERS_DETAIL: "/red_cross/get_accepted_orders_detail",
  GET_ACCEPTED_EVENTS_DETAIL: "/red_cross/get_accepted_events_detail",
};

// merge url of base axios url and required ones
function buildUrl(url) {
  return "http://localhost:8080/api" + url;
  //return "http://202.191.56.247:8090/api" + url;
}

async function login(payload, callback) {
  axios({
    method: "POST",
    url: buildUrl(url.LOGIN),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function register(payload, callback) {
  axios({
    method: "POST",
    url: buildUrl(url.REGISTER),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function getUserInfo(callback) {
  axios({
    method: "GET",
    url: buildUrl(url.GET_USER),
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getBloodEventsDonors(callback) {
  axios({
    method: "GET",
    url: buildUrl(url.GET_BLOOD_EVENTS_DONORS),
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function getBloodEvents(payload, callback) {
  axios({
    method: "GET",
    url:
      buildUrl(url.GET_BLOOD_EVENTS) +
      "?offset=" +
      payload.offset +
      "&limit=" +
      payload.limit,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function createBloodEvent(payload, callback) {
  axios({
    method: "POST",
    url: buildUrl(url.ADD_BLOOD_EVENT),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function getBloodEvent(payload, callback) {
  axios({
    method: "GET",
    url: buildUrl(url.GET_BLOOD_EVENT) + "/" + payload,
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function deleteBloodEvents(payload, callback) {
  axios({
    method: "DELETE",
    url: buildUrl(url.DELETE_BLOOD_EVENTS),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function updateBloodEvent(payload, callback) {
  axios({
    method: "POST",
    url: buildUrl(url.UPDATE_BLOOD_EVENT) + "/" + payload.event_id,
    data: payload.editedEvent,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getRegisteredBloodEvent(callback) {
  axios({
    method: "GET",
    url: buildUrl(url.GET_REGISTERED_BLOOD_EVENT),
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function postRegisterBloodEvent(payload, callback) {
  axios({
    method: "POST",
    url: buildUrl(url.GET_REGISTERED_BLOOD_EVENT),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function updateUserProfile(payload, callback) {
  axios({
    method: "POST",
    url: buildUrl(url.UPDATE_PROFILE),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function updateUserPassword(payload, callback) {
  axios({
    method: "POST",
    url: buildUrl(url.UPDATE_PASSWORD),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function getPendingBloodEvent(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_PENDING_EVENT) + "/" + params,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getAcceptedBloodEvent(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_ACCEPTED_EVENTS) + "/" + params,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getPendingOrders(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_PENDING_ORDER) + "/" + params,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getAcceptedOrders(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_ACCEPTED_ORDERS) + "/" + params,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function postAcceptBloodEvent(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "PUT",
    url: buildUrl(url.POST_ACCEPT_EVENT + "/" + params),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function postTestedDonation(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "POST",
    url: buildUrl(url.POST_TESTED_DONATION + "/" + params),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function postAcceptOrder(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "PUT",
    url: buildUrl(url.POST_ACCEPT_ORDER + "/" + params),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function postRejectBloodEvent(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "PUT",
    url: buildUrl(url.POST_REJECT_EVENT + "/" + params),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function postRejectOrder(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "PUT",
    url: buildUrl(url.POST_REJECT_ORDER + "/" + params),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function postRejectDonation(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "PUT",
    url: buildUrl(url.POST_REJECT_DONATION + "/" + params),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function postAcceptedDonation(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "POST",
    url: buildUrl(url.POST_ACCEPT_DONATION + "/" + params),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getBloodStore(callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_BLOOD_STORE),
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getBloodDonation(callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_BLOOD_DONATION),
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getAcceptedBloodDonation(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_ACCEPTED_DONATIONS) + "/" + params,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getUntestedBloodDonation(callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_UNTESTED_BLOOD_DONATION),
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getDonationList(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.VIEW_DONATION_LIST + "/" + params),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function getAllBloodOrders(callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_BLOOD_ORDER),
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function getSentBloodOrders(payload, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url:
      buildUrl(url.GET_SENT_BLOOD_ORDER) +
      "?offset=" +
      payload.offset +
      "&limit=" +
      payload.limit,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function getUnsentBloodOrders(payload, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url:
      buildUrl(url.GET_UNSENT_BLOOD_ORDER) +
      "?offset=" +
      payload.offset +
      "&limit=" +
      payload.limit,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function createBloodOrders(payload, callback) {
  axios({
    method: "POST",
    url: buildUrl(url.ADD_BLOOD_ORDER),
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function getBloodOrderWithID(payload, callback) {
  axios({
    method: "GET",
    url: buildUrl(url.GET_BLOOD_ORDER_ID) + payload,
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function updateBloodOrderInfo(payload, callback) {
  axios({
    method: "POST",
    url: buildUrl(url.UPDATE_BLOOD_ORDER_INFO) + payload.id,
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function sendOrder(payload, callback) {
  axios({
    method: "POST",
    url: buildUrl(url.SEND_ORDER) + payload.id,
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

function deleteBloodOrder(payload, callback) {
  axios({
    method: "DELETE",
    url: buildUrl(url.DELETE_BLOOD_ORDER) + payload.id,
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getDonors(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_DONORS) + "/" + params,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getDonorsDetail(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_DONORS_DETAIL) + "/" + params,
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getHospitals(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_HOSPITALS) + "/" + params,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getHospitalsDetail(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_HOSPITALS_DETAIL) + "/" + params,
    data: payload,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getOrganizers(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_ORGANIZERS) + "/" + params,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getOrganizersDetail(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_ORGANIZERS_DETAIL) + "/" + params,
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getAcceptedOrdersDetail(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_ACCEPTED_ORDERS_DETAIL + "/" + params),
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
function getAcceptedEventsDetail(payload, params, callback) {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios({
    method: "GET",
    url: buildUrl(url.GET_ACCEPTED_EVENTS_DETAIL + "/" + params),
  })
    .then((response) => {
      callback(true, response, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}
const Api = {
  login,
  register,
  getUserInfo,
  getBloodEvent,
  getBloodEvents,
  createBloodEvent,
  deleteBloodEvents,
  updateBloodEvent,
  getRegisteredBloodEvent,
  postRegisterBloodEvent,
  updateUserProfile,
  updateUserPassword,
  getPendingBloodEvent,
  getPendingOrders,
  getBloodStore,
  getUntestedBloodDonation,
  getBloodDonation,
  postAcceptBloodEvent,
  postAcceptedDonation,
  postRejectBloodEvent,
  postRejectDonation,
  postAcceptOrder,
  postRejectOrder,
  postTestedDonation,
  getBloodEventsDonors,
  getAcceptedBloodDonation,
  getAcceptedBloodEvent,
  getAcceptedOrders,
  getAllBloodOrders,
  createBloodOrders,
  getBloodOrderWithID,
  updateBloodOrderInfo,
  sendOrder,
  getSentBloodOrders,
  getUnsentBloodOrders,
  deleteBloodOrder,
  getDonationList,
  getOrganizers,
  getDonors,
  getHospitals,
  getDonorsDetail,
  getOrganizersDetail,
  getHospitalsDetail,
  getAcceptedOrdersDetail,
  getAcceptedEventsDetail,
};

export default Api;
