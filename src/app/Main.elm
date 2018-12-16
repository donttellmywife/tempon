module Main exposing (main)

import Browser exposing (UrlRequest)
import Browser.Navigation as Nav
import Html exposing (..)
import Http
import Url exposing (Url)
import Json.Decode as D exposing (Decoder, int, string, float, Value)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)

import Models exposing (..)
import Pages exposing(..)
import Routes exposing (Route, parseLocation)


type Msg
    = OnUrlChange Url
    | OnUrlRequest UrlRequest

type alias Flags =
  { works: Bool
  }

-- MAIN
type alias Document msg =
  { title : String
  , body : List (Html msg)
  }

main : Program Value Model Msg
main = Browser.application
  { init = \flags -> \url -> \key -> ({initialModel | route = parseLocation url}, Cmd.none )
  , view = \model -> Document "asd" [Pages.landing model]
  , update = \msg model -> (model, Cmd.none)
  , subscriptions = \model -> Sub.none
  , onUrlRequest = OnUrlRequest
  , onUrlChange = OnUrlChange
  }


-- init : Flags -> Url -> Nav.Key -> ( Model, Cmd Msg )
-- init flags url key =

-- init flags url navKey =
--     let
--         model =
--             { flags = flags
--             , navKey = navKey
--             , route = Routes.fromUrl url
--             , page = Routes.Home
--             }
--     in
--     ( model, Cmd.none )
--         |> loadCurrentPage

-- MODEL
