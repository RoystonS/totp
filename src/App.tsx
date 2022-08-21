import { TOTP } from 'otpauth';
import { RenderCode } from './RenderCode';

function App() {
  const searchParams = new URLSearchParams(window.location.search);

  const secret = window.location.hash.substring(1) || 'MYSECRET';
  const period = parseInt(searchParams.get('period') || '30');
  const digits = parseInt(searchParams.get('digits') || '6');

  const otp = new TOTP({
    secret,
    digits,
    period,
  });

  return (
    <div>
      <RenderCode otp={otp} />
    </div>
  );
}

export default App;
