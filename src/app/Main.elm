module Main exposing (main)

import Browser
import Html exposing (..)
import Http
import Json.Decode as D exposing (Decoder, int, string, float, Value)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)

import Models exposing (..)
import Pages exposing(..)



-- MAIN
type alias Document msg =
  { title : String
  , body : List (Html msg)
  }

main : Program Value Model msg
main = Browser.document
  { init = \flags -> (initialModel, Cmd.none)
  , view = \model -> Document "asd" [Pages.signUp model]
  , update = \msg model -> (model, Cmd.none)
  , subscriptions = \model -> Sub.none
  }

-- MODEL
