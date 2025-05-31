<!-- creating file wihout test -->
# nest g resource user --no-spec


<!--  fetched users in a room -->
# const clients = await this.server.in('1').fetchSockets()
# const count = clients.length;