import { userFeature } from "../../services";
import { publicProcedure, router, TokenBasedProcedure } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { addToContactInput, addToContactOutput, listContactsInput, listContactsOutput } from "./model";



const TAGS = ["Authentication"];
const getPath = generatePath("/features");

export const userFeatureRouter = router({
    addToContact: TokenBasedProcedure
        .meta({
            openapi: {
                method: "POST",
                path: getPath("addToContact"),
                tags: TAGS,
            },
        })
        .input(addToContactInput).output(addToContactOutput)
        .mutation(async ({ input }) => {
            const message = await userFeature.addToContact(input);

            return {
                message
            }
        }),

        listContacts : TokenBasedProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: getPath('listContacts'),
                tags: TAGS
            }
        }).input(listContactsInput).output(listContactsOutput).query( async({input}) => {
            const result  = await userFeature.listContact(input.phoneNumber)

            return result
        })
//end
});