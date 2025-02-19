import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { format, addMinutes } from 'date-fns';
import Loader from '../loader';

import Ticket from '../ticket/ticket';

import classes from './tickets-list.module.scss';

const TicketList = () => {
  function formatPrice(price) {
    let priceStr = price.toString();
    priceStr = priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return priceStr + ' Р';
  }
  function calculateFlightTime(departureTime, durationInMinutes) {
    // Преобразуем строку даты в объект Date
    const departureDate = new Date(departureTime);

    // Время прибытия (отправляем дату и добавляем продолжительность полета)
    const arrivalDate = addMinutes(departureDate, durationInMinutes);

    // Форматируем время отправления и прибытия в формат HH:mm
    const departureFormatted = format(departureDate, 'HH:mm');
    const arrivalFormatted = format(arrivalDate, 'HH:mm');

    // Форматируем продолжительность полета в формат HHч mmм
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    const durationFormatted = `${hours}ч ${minutes}м`;

    // Возвращаем строку в формате "HH:mm - HH:mm"
    return {
      timeRange: `${departureFormatted} - ${arrivalFormatted}`,
      flightDuration: durationFormatted,
    };
  }
  function formatTransfers(stopsCount) {
    let res = '';
    if (stopsCount < 1 || stopsCount > 4) {
      res = `${stopsCount} пересадок`;
    } else if (stopsCount === 1) {
      res = `${stopsCount} пересадка`;
    } else {
      res = `${stopsCount} пересадки`;
    }
    return res;
  }
  const { currentTickets, loading } = useSelector((state) => state.aviaApiReducer);
  const ticketList = currentTickets.map((item) => {
    const id = nanoid();
    const formatedPrice = formatPrice(item.price);
    const wayThere = item.segments[0];
    const wayBack = item.segments[1];
    const citiesThere = `${wayThere.origin} - ${wayThere.destination}`;
    const citiesBack = `${wayBack.origin} - ${wayBack.destination}`;
    const logo = `https://pics.avs.io/99/36/${item.carrier}.png`;
    const { timeRange: timeThere, flightDuration: flyTimeThere } = calculateFlightTime(
      wayThere.date,
      wayThere.duration
    );
    const { timeRange: timeBack, flightDuration: flyTimeBack } = calculateFlightTime(wayBack.date, wayBack.duration);
    const stopsNamesThere = wayThere.stops.join(', ');
    const stopsCountThere = formatTransfers(wayThere.stops.length);
    const stopsNamesBack = wayBack.stops.join(', ');
    const stopsCountBack = formatTransfers(wayBack.stops.length);

    return (
      <Ticket
        key={id}
        price={formatedPrice}
        citiesThere={citiesThere}
        citiesBack={citiesBack}
        logo={logo}
        timeThere={timeThere}
        flyTimeThere={flyTimeThere}
        timeBack={timeBack}
        flyTimeBack={flyTimeBack}
        stopsNamesThere={stopsNamesThere}
        stopsCountThere={stopsCountThere}
        stopsNamesBack={stopsNamesBack}
        stopsCountBack={stopsCountBack}
      />
    );
  });
  const content = loading ? <Loader /> : ticketList;
  return <div className={classes['tickets-list']}>{content}</div>;
};

export default TicketList;
