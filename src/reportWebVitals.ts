import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals/attribution';

function reportWebVitals() {
  onCLS(console.log);
  onFCP(console.log);
  onINP(console.log);
  onLCP(console.log);
  onTTFB(console.log);
}

export default reportWebVitals;
