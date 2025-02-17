import { User } from "src/schemas/user.schema";

interface RequestWithUser extends Request {
    user: User;
}
  
export default RequestWithUser;