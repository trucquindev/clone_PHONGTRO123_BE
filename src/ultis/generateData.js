import moment from "moment";

const formatDay = (timeOjb) => {
  let day = timeOjb.getDay() === 0 ? "Chủ nhật" : `Thứ ${timeOjb.getDay() + 1}`;
  let date = `${timeOjb.getDate()}/${
    timeOjb.getMonth() + 1
  }/${timeOjb.getFullYear()}`;
  let time = `${timeOjb.getHours()}:${timeOjb.getMinutes()}`;
  return `${day}, ${date} ${time}`;
};
const generateDate = () => {
  let today = new Date();
  let expireDay = moment(today).add(2, "d").toDate();
  return {
    today: formatDay(today),
    expireDay: formatDay(expireDay),
  };
};

export default generateDate;
