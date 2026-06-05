import { db, eq } from "@repo/database";
import { usersTable,  refreshTokensTable} from "@repo/database/schema";


import {
  registerInput,
  registerInputType,
  registerUserWithEmailInputType,
  registerUserWithoutEmailInputType,
  registerUserWithEmailInput,
  registerUserWithoutEmailInput,
  userInsertOuputInputType,
  userInsertOutputInput,
  logInInput,
  logInInputType
} from "./model";
import apiErr from "@repo/utils/apiErr"
import { hashIT, comparePass } from "@repo/utils/hashIT"
import { generateAccTok, generateRefTok } from "@repo/utils/jwtUtils"
import { userInfo } from "os";

class UserService {
  //================================================ PRIVATE METHODS ==========================================================
  private async registerUserWithEmail({ fullName, phoneNumber, password, accountType, email }: registerUserWithEmailInputType) {
    const userInsertOuput = await db.insert(usersTable).values({ fullName, phoneNumber, password, accountType, email }).returning({ id: usersTable.id })
    return userInsertOuput
  }

  private async registerUserWithoutEmail({ fullName, phoneNumber, password, accountType }: registerUserWithoutEmailInputType) {
    const userInsertOuput = await db.insert(usersTable).values({ fullName, phoneNumber, password, accountType }).returning({ id: usersTable.id })
    return userInsertOuput
  }

  private async userInsertOutput(payload: userInsertOuputInputType) {
    try {
      const { fullName, phoneNumber, password, accountType, email } = await userInsertOutputInput.parseAsync(payload)
      if (!email) {
        const hashedPass = await hashIT(password)
        const userInsertOutput = await this.registerUserWithoutEmail({ fullName, phoneNumber, password: hashedPass, accountType })
        return userInsertOutput
      }
      else {
        const hashedPass = await hashIT(password)
        const userInsertOutput = await this.registerUserWithEmail({ fullName, phoneNumber, password: hashedPass, accountType, email })
        return userInsertOutput
      }
    } catch (error) {
      console.log("+++++ private function error +++++")
      console.log(error)
    }
  }


  private async getUserByPhoneNumber(phoneNumber: string) {
    const res = await db.select().from(usersTable).where(eq(usersTable.phoneNumber, phoneNumber))

    if (!res || res.length == 0) {
      return null
    }
    return res
  }

  // ========================================== PUBLIC METHODS =======================================================================
  //register
  public async Register(payload: registerInputType) {
    try {
      const { fullName, phoneNumber, password, accountType, email } = await registerInput.parseAsync(payload)
      const userExist = await this.getUserByPhoneNumber(phoneNumber)

      if (userExist) {
        throw apiErr.dataAlreadyExist("phone number already registered")
      }

      const userInsertOutput = await this.userInsertOutput({ fullName, phoneNumber, password, accountType, email })

      if (!userInsertOutput || userInsertOutput.length === 0 || !userInsertOutput[0]?.id) {
        throw apiErr.unknownErr()
      }

      return {
        id: userInsertOutput[0].id
      }
    } catch (error) {
      console.log("++ register error ++")
      console.log(error)
      throw error
    }
  }

  //login
  public async logIN(payload: logInInputType) {
    try {
      const { phoneNumber, password } = await logInInput.parseAsync(payload)

      const userExist = await this.getUserByPhoneNumber(phoneNumber)

      if (!userExist) {
        throw apiErr.dataNotFound("no account register with the given phone number")
      }
      const res: any = await db.select().from(usersTable).where(eq(usersTable.phoneNumber, phoneNumber))
      if (!res || res.length === 0) {
        throw apiErr.dataNotFound()
      }

      //fck this error, ignore the object is possible undefined error, fck u typescipt
      const hashedPass: string = res[0].password
      const isPassValid = await comparePass(password, hashedPass)

      if (isPassValid) {
        const accessToken = generateAccTok({ sub: res[0].id })
        const refreshToken = generateRefTok({ sub: res[0].id })


        await db.insert(refreshTokensTable).values({
          userId: res[0].id,
          token: refreshToken,
        })

        return {
          userId: res[0].id,
          fullName: res[0].fullName,
          phoneNumber: res[0].phoneNumber,
          accessToken,
          refreshToken
        }
      }
      else {
        throw apiErr.unauthorizedAccess("invalid password")
      }
    } catch (error) {
      console.log("================================= login error ================================")
      console.log(error)
      throw error
    }
  }
//end
}

export default UserService;
