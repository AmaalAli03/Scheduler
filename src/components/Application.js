import "components/Application.scss";
import DayList from "./DayList";
import React from "react";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";




export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  // const [state, setState] = useState({
    //   day: "Monday",
    //   days: [],
    //   appointments: {},
    //   interviewers: {}
    // });
    // const dailyAppointments = [];
    const dailyAppointments = getAppointmentsForDay(state, state.day);
    const interviewers = getInterviewersForDay(state, state.day);
  // const setDay = day => setState({ ...state, day });


  // function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   return axios.put(`/api/appointments/${id}`, { interview })
  //     .then((response) => {
  //       setState({ ...state, appointments });
  //     });
   

  // }
  // function cancelInterview(id) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   return axios.delete(`/api/appointments/${id}`)
  //     .then((response) => {
  //       setState({ ...state, appointments });
  //     });
      

  // }
  

  // useEffect(() => {
  //   Promise.all([
  //     axios.get("/api/days"),
  //     axios.get("/api/appointments"),
  //     axios.get("/api/interviewers")
  //   ]).then(all => {
  //     const days = all[0].data;
  //     const appointments = all[1].data;
  //     const interviewers = all[2].data;
  //     setState((prev) => ({ ...prev, days, appointments, interviewers }));


  //   });
  // }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList

            days={state.days}
            value={state.day}
            onChange={setDay}

          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return <Appointment
            key={appointment.id}
            {...appointment}
            interview={interview}
            interviewers={interviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          
          />;
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
