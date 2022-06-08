export class HttpService {
  static async fetch(url: string) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}

export class MockHttpService {
  static async fetch(url: string) {
    if (url.startsWith("https://master")) {
      return MockHttpService.mockCustomerData().then(JSON.parse);
    } else if (url.startsWith("https://detail")) {
      const matches = url.match(/^.*(\d+)$/);
      const customerId = matches[1];

      return MockHttpService.mockCustomerData().then((response) => {
        const details = JSON.parse(response);
        return details.find((item) => item.id === customerId);
      });
    }
  }

  static async mockCustomerData() {
    return `
        [
            {
              "id": "1",
              "title": "Mvr",
              "firstname": "Lisa",
              "surname": "Smit",
              "address1": "12 Leopoldstraat",
              "address2": "Alkmaar, Noord Holland",
              "postcode": "1032 RE",
              "telephone": "0574 748373",
              "email": "lisa.smit@gmail.com",
              "mail": true,
              "age": 19
            },
            {
              "id": "2",
              "title": "Mnr",
              "firstname": "Hans",
              "surname": "Boppard",
              "address1": "119A Tigresplein",
              "address2": "Wijk-aan-Zee, Noord Holland",
              "postcode": "1066 AB",
              "telephone": "0290 627390",
              "email": "hans.boppard@gmail.com",
              "mail": false,
              "age": 43
            }
          ]
        `;
  }
}
