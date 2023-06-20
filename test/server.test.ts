import Server from '../src/server';

describe("Test on class Server", () => {

    const server = new Server(4000);

    it("Should server run on port 4000", () => {
        expect(server.port).toBe(4000);
    })

})