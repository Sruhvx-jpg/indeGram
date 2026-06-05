import { contactsTable, usersTable } from "@repo/database/schema";
import { addToContactInput, addToContactType } from "./model";
import db, { and, eq } from "@repo/database";
import apiErr from "@repo/utils/apiErr";

class userFeatures {
    //=========================================== private methods ==========================================================
    private async findUserById(id: string) {
        try {
            const user = await db.select({
                id: usersTable.id,
                phoneNumber: usersTable.phoneNumber
            }).from(usersTable).where(eq(usersTable.id, id))

            return user
        } catch (error) {
            console.log("findUserById methods error")
            throw error
        }
    }

    private async findContactByPhoneNum(phoneNumber: string) {
        try {
            const user = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.phoneNumber, phoneNumber))

            const contact = user.at(0)
            if (!contact) {
                throw apiErr.dataNotFound("User doesn't exist or wrong phone number entered")
            }
            else {
                return user[0]
            }
        } catch (error) {
            console.log("findContactById methods error: ", error)
            throw error
        }
    }

    private async checkContactExist(ownerId: string, contactId: string) {
        try {
            const isContactExist = await db
                .select()
                .from(contactsTable)
                .where(
                    and(
                        eq(contactsTable.ownerId, ownerId),
                        eq(contactsTable.contactId, contactId)
                    )
                )

                return isContactExist.length > 0
        } catch (error) {
            console.log("checkContactExist error")
            throw error
        }
    }

    //=================================================== public methods =================================================
    public async addToContact(payload: addToContactType) {
        try {
            const { phoneNumber, ownerId } = await addToContactInput.parseAsync(payload)

            //check if its the owner phoneNumber itself
            const user = await this.findUserById(ownerId)
            if (user[0]?.phoneNumber === phoneNumber) {
                throw apiErr.unauthorizedAccess("You cannot add yourself")
            }

            const contactId = await this.findContactByPhoneNum(phoneNumber)

            if(contactId == undefined) throw apiErr.dataNotFound()
            const isContactExist = await this.checkContactExist(ownerId, contactId?.id)

            if(isContactExist) {
                throw apiErr.dataAlreadyExist("phoneNumber already in contact")
            }

            await db.insert(contactsTable).values({ownerId, contactId: contactId.id})
            let message = `${phoneNumber} added to contact`

            return message
        } catch (error) {
            throw error
        }
    }
    //end 
}

export default userFeatures;