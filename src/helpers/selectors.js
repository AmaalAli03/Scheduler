//function to get appointment for day
function getAppointmentsForDay(state, day) {
  const dayofFoundDay = state.days.find((dy) => dy.name === day);
  if (!dayofFoundDay) {
    return [];
  }
  const appointmentsIds = dayofFoundDay.appointments;
  const appointments = appointmentsIds.map((id) => {
    return state.appointments[id];
  });
  return appointments;
}
//function to get interview
function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const id = interview.interviewer;
  const interviewObj = {
    "student": interview.student,
    "interviewer": {
      id: id,
      name: state.interviewers[id].name,
      avatar: state.interviewers[id].avatar
    }
  };
  return interviewObj;
}
//function to get interviewers for day
function getInterviewersForDay(state, day) {

  const dayofFoundDay = state.days.find((dy) => dy.name === day);

  if (!dayofFoundDay) {
    return [];
  }
  const appointmentsIds = dayofFoundDay.interviewers;
  const interviewers = appointmentsIds.map((id) => {
    return state.interviewers[id];
  });
  return interviewers;
}


export { getAppointmentsForDay, getInterview, getInterviewersForDay };