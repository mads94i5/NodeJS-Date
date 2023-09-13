function calcDate(yourAge, dateAge) {
    lowestRecommendedAge = yourAge / 2 + 7;
    if (dateAge < 15) {
      return "Your date is too young to be dating, you disgusting pig!";
    } else if (yourAge < 15) {
      return "You are too young to be dating.";
    } else if (yourAge < dateAge) {
      return "Your date is older than you.";
    } else if (yourAge == dateAge) {
      return "Your date is same age as you.";
    } else if (lowestRecommendedAge > dateAge) {
      return "Your date is outside the acceptable age range, you disgusting pig!";
    } else {
      return "Your date is within the acceptable age range.";
    }
  };
  
  function getAgeFromDate(date) {
    const currentDate = new Date();
    const inputDate = new Date(date);
  
    if (
      inputDate.getDate() < currentDate.getDate() &&
      inputDate.getMonth() < currentDate.getMonth()
    ) {
      return currentDate.getFullYear() - inputDate.getFullYear() - 1;
    } else {
      return currentDate.getFullYear() - inputDate.getFullYear();
    }
  };
  
  module.exports = { calcDate, getAgeFromDate };