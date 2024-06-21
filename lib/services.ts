import { SimpleSalesService } from './services/sample-stock-management';
import { CommerceService } from './utils/commerce-service';

// Create service to fetch data from simple sales API
const service1 = new CommerceService(
  new SimpleSalesService(undefined, {
    baseURL: 'https://api.example.com',
    headers: {
      Authorization: 'Bearer <token>'
    }
  })
);

// Create service to fetch data from another API
// const service2 = new CommerceService(new AnotherService());

// Export the service instance you want to use
export default service1;
