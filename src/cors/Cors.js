import cors from 'cors';

 const corsOption = {
    origin: '*',
    optionsSuccessStatus: 200

 }
export default cors(corsOption);