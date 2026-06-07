import { userFeature } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { addToContactInput, addToContactOutput, listContactsInput, listContactsOutput } from "./model";



const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const userFeatureRouter = router({
    addToContact: publicProcedure
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

        listContacts : publicProcedure
        .meta({
            openapi: {
                method: 'post',
                path: getPath('listContacts'),
                tags: TAGS
            }
        }).input(listContactsInput).output(listContactsOutput)
//end
});