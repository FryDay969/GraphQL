const { GraphQLString,
        GraphQLList,
        GraphQLObjectType,
        GraphQLNonNull,
        GraphQLSchema
} = require('graphql')
const _ = require('lodash');

const shoesProducts = require('../data/shoes');

const ShoesType = new GraphQLObjectType({
    name:"Shoe",
    description:"Example of shoes category",
    fields: () => ({
        id:{type:new GraphQLNonNull(GraphQLString)},
        brand:{type:new GraphQLNonNull(GraphQLString)},
        model:{type:new GraphQLNonNull(GraphQLString)},
        color:{type:new GraphQLNonNull(GraphQLString)},
        price:{type:new GraphQLNonNull(GraphQLString)},
        availability:{type:new GraphQLNonNull(GraphQLString)},
    })
});

const ShoesQueryRootType = new GraphQLObjectType({
    name:"ShoesAppSchema",
    description:"Shoes Query",
    fields: () => ({
        shoesProducts: {
            type: new GraphQLList(ShoesType),
            description:"List of all positions",
            args:{
                id:{
                    type:GraphQLString
                }
            },
            resolve: function (root, args) {
                if(args.id) return [shoesProducts.find(a => a.id === args.id)]
                return shoesProducts
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:() => ({
        updateShoe:{
            type: new GraphQLList(ShoesType),
            description:"Update of position by Id",
            args:{
                id:{
                    type:GraphQLString
                },
                name:{
                    type:GraphQLString
                }
            },
            resolve:function (root,args) {
                if(args.id){
                    let positionForUpdate = shoesProducts.find(a => a.id === args.id);
                    positionForUpdate.model = args.name;
                    return [positionForUpdate]
                }

            }
        }
    })
})

const ShoesAppSchema = new GraphQLSchema({
    query:ShoesQueryRootType,
    mutation:Mutation
})


module.exports = ShoesAppSchema;