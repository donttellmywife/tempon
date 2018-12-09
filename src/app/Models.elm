module Models exposing (..)

import Lorem

type alias User =
  { email : String
  }
  -- | Client
  -- | Assistant
  -- | Guest

type alias Bundle =
  { id: String
  , date: String
  , description: String
  , client: String
  }

type alias Model =
  { bundles: List Bundle
  , user: User
  }

initialBundle : String -> Bundle
initialBundle id =
    { id = id
    , date = Lorem.sentence 4
    , description = Lorem.paragraphs 2 |> String.concat
    , client = "Client"
    }

initialModel : Model
initialModel =
    { bundles = List.range 1 10 |> List.map Debug.toString |> List.map initialBundle
    , user = { email = "email@gmail.com" }
    }
