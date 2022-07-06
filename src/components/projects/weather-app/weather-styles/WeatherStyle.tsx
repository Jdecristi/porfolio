//Imports
import { useAppSelector } from '../../../../redux/hooks';
import { clouds, clear, rain, snow, brokenClouds } from './WeatherStyles';
import Cloud from './WeatherIcons/Cloud';
import CelestialBody from './WeatherIcons/CelestialBody';
import RainDrop from './WeatherIcons/RainDrop';
import SnowBall from './WeatherIcons/SnowBall';
import LighningBolt from './WeatherIcons/LightningBolt';
import { Container } from '@mui/material';

const WeatherStyle: React.FC = () => {
   const { day, main } = useAppSelector((state) => state.weatherData);

   const isDay = day ? 'day' : 'night';

   return (
      <Container maxWidth="sm" sx={{ position: 'fixed', fontSize: '1vw', top: '20%', left: '20%', transform: 'translateY(-50%)' }}>
         {main === 'CLEAR' || main === 'CLOUDS' || main === 'ATMOSPHERE'
            ? clear[isDay].map((d) => (
                 <CelestialBody key={clear[isDay].indexOf(d)} insideColor={d.insideColor} outsideColor={d.outsideColor} size={d.size} position={d.position} zIndex={d.zIndex} />
              ))
            : null}
         {main === 'CLOUDS'
            ? brokenClouds.map((c) => <Cloud key={brokenClouds.indexOf(c)} type={c.type} color={c.color} size={c.size} position={c.position} zIndex={c.zIndex} />)
            : null}
         {main === 'RAIN' || main === 'SNOW' || main === 'THUNDERSTORM'
            ? clouds.map((c) => <Cloud key={clouds.indexOf(c)} type={c.type} color={c.color} size={c.size} position={c.position} zIndex={c.zIndex} />)
            : null}
         {main === 'RAIN' || main === 'DRIZZLE' || main === 'THUNDERSTORM' ? rain.map((r) => <RainDrop key={rain.indexOf(r)} position={r.position} />) : null}
         {main === 'SNOW' ? snow.map((s) => <SnowBall key={snow.indexOf(s)} position={s.position} />) : null}
         {main === 'THUNDERSTORM' ? <LighningBolt /> : null}
      </Container>
   );
};

export default WeatherStyle;
