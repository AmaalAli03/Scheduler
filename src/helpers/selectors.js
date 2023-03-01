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