# Orbs Network Guardians' SubGraph



## Networks and Performance

This subgraph can be found on The Graph Hosted Service at https://thegraph.com/explorer/subgraph/graphprotocol/orbs-network.

You can also run this subgraph locally, if you wish. Instructions for that can be found in [The Graph Documentation](https://thegraph.com/docs/quick-start).

### ABI

The ABIs used are:

* `GuardiansRegistration.json` - for the data on guardian's identity and registration status.
* `Committee.json` - for updating the committee status and weight and also the certification. 

## Getting started with querying

For a simple example look at the [main.test.js](./main.test.js). In this case we query the current state of all registered guardians and sort them according to when they registered.
For more options just check out the [querying api](https://github.com/graphprotocol/graph-node/blob/master/docs/graphql-api.md).

You can also see the saved queries on the hosted service for examples.
