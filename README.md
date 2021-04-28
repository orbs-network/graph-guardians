# Orbs Network Guardians' SubGraph



## Networks and Performance

This subgraph can be found on The Graph Hosted Service at https://thegraph.com/explorer/subgraph/graphprotocol/orbs-network.

You can also run this subgraph locally, if you wish. Instructions for that can be found in [The Graph Documentation](https://thegraph.com/docs/quick-start).

### ABI

The ABIs used are:

* `GuardiansRegistration.json` - for the data on guardian's identity and registration status.
* `Committee.json` - for updating the committee status and weight and also the certification. 
* `Certification.json` - for updating the guardians' certification status. 

### Update and upgrades

* `clone https://github.com/orbs-network/graph-guardians`
* `cd graph-guardians`
* `npm install`
* `npm run codegen` - needs to be run after each time you change subgraph.yaml
* To deploy to orbs-network/graph-guardians you need to have admin rights in github to the orbs-network organization. 
* `graph deploy --debug --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ --access-token <to-orbgs-subgrah> orbs-network/Guardians`
* After deploy the public graph needs time to re-sync all the data from origin point - should take less than 30 minutes as long as all data querried is from Events.

### Forking

Same process as the update but you don't need to have orbs-network adming rights or access-token. Please refer to [The Graph documents](https://thegraph.com/docs/quick-start) for instructions setting up local deveoplemt of graph node. You can find information on creating your own subgraph and deploying to it.

## Getting started with querying

For a simple example look at the [main.test.js](./main.test.js). In this case we query the current state of all registered guardians and sort them according to when they registered.
For more options just check out the [querying api](https://github.com/graphprotocol/graph-node/blob/master/docs/graphql-api.md).

You can also see the saved queries on the hosted service for examples.
