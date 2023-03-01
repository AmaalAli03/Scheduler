

import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props){

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));


    });
  }, []);



  const updateSpots = (day, days, appointments) => {
    const currentDay = days.find((randomDay) => randomDay.name === day);
    const currentAppointments = currentDay.appointments;
    let spots = 0;
    for (const currentAppointment of currentAppointments) {
      if (!appointments[currentAppointment].interview) {
        spots++;
      }
    }
    currentDay.spots = spots;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        updateSpots(state.day, state.days, appointments);
        setState({ ...state, appointments });
      });


  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        // setState({ ...state, appointments });
        state.appointments[id].interview = null;
        updateSpots(state.day, state.days, state.appointments);
        setState({ ...state, appointments: state.appointments, days: state.days });
      });


  }
return {state, setDay, bookInterview, cancelInterview, updateSpots}
};
