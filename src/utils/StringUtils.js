const StringUtils = {
  isEmpty(data) {
    return data === null || data === undefined || data === '';
  },
  getDate(unix) {
    var date = new Date(unix * 1000);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).substr(-2);
    var day = ("0" + date.getDate()).substr(-2);
    var hour = ("0" + date.getHours()).substr(-2);
    var minutes = ("0" + date.getMinutes()).substr(-2);
    var seconds = ("0" + date.getSeconds()).substr(-2);

    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
  },
  getDataLimit(number, data) {
    let newData = '';
    if (!this.isEmpty(data)) {
      const dataSplit = data.split(' ');
      let length = 0;
      for (let i = 0; i < dataSplit.length; i += 1) {
        length += dataSplit[i].length;
        if (i === 0 && length > number) {
          for (let j = 0; j < number; j += 1) {
            newData += dataSplit[i][j];
          }
          newData += ' ...';
          break;
        } else if (length < number) {
          newData += `${dataSplit[i]} `;
        } else {
          newData += ' ...';
          break;
        }
      }
    }
    return newData;
  },
  jsonCheckExistKey(json, key) {
    return json.hasOwnProperty(key);
  },
  convertNaN20(number) {
    if (isNaN(number)) return 0;
    return number;
  },
  matchNumber(data) {
    const regex = /\d+/g;
    return data.match(regex);
  },
  isConvert2Json(data) {
    try {
      if (JSON.parse(data)) return true;
    } catch (error) {
      return false;
    }
    return false;
  },
  isEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(regex);
  },
  roleToString(role) {
    switch (role) {
      case "donor":
      case "organizer":
      case "hospital":
        return role;
      case "red_cross":
        return "red cross"
    }
  }
};

export default StringUtils;