export function getAppointmentsForDay(state, day) {
  console.log(state.days, day);
  const dayofFoundDay = state.days.find((dy) => dy.name === day);
  console.log(dayofFoundDay, day);
  if (!dayofFoundDay) {
    return [];
  }
  const appointmentsIds = dayofFoundDay.appointments;
  const appointments = appointmentsIds.map((id) => {
    return state.appointments[id];
  });
  return appointments;
}