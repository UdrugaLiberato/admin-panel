import {getUserId} from "../context/user";
import axios from "axios";
import {headers} from "../constants";

export const postBlogArticle = (title, body, images) => {
  const userId = getUserId()

  const data = {
    "data": {
      "type": "post",
      "attributes": {
        title,
        body,
        images
      },
      "relationships": {
        "user": {
          "data": {
            "type": "user",
            "id": userId
          }
        }
      }
    }
  }

  axios
    .post(`https://api.udruga-liberato.hr/web/v1/post`, data, {
      headers,
    })
    .catch((err) => console.error(err));
}
