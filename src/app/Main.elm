import Browser
import Http
import Json.Decode as D exposing (Decoder, int, string, float)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)



-- MAIN


main =
  Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model =
  { name : String
  , password : String
  , email : String
  }


init : ( Model, Cmd Msg )
init =
  ( Model "" "" "", Cmd.none )


-- UPDATE


type Msg
  = Name String
  | Password String
  | Email String
  | TryLogin


update : Msg ->  ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
update msg ( model, some ) =
  case msg of
    Name name ->
      ( { model | name = name }, Cmd.none )

    Password password ->
      ( { model | password = password }, Cmd.none )

    Email email ->
      ( { model | email = email }, Cmd.none )

    TryLogin  -> ( model, Cmd.none )


-- VIEW


view : ( Model, Cmd Msg ) -> Html Msg
view ( model, some ) =
  div []
    [ viewInput "text" "Account" model.name Name
    , viewInput "password" "Password" model.password Password
    , viewInput "email" "Email" model.email Email
    , button [ onClick TryLogin ] [ text "Enter" ]
    , viewValidation model
    ]


viewInput : String -> String -> String -> (String -> msg) -> Html msg
viewInput t p v toMsg =
  input [ type_ t, placeholder p, value v, onInput toMsg ] []


viewValidation : Model -> Html msg
viewValidation model =
  div [ style "color" "green" ] [ text "OK" ]

-- type alias User =
--   { id : Int
--   -- , email : Maybe String
--   , name : String
--   , level : Int
--   }
--
-- -- decoder : D.Decoder User
-- -- decoder =
-- --   D.map3 User
-- --     (D.field "name" D.string)
-- --     (D.field "id" String.toInt D.int)
-- --     (D.field "level" D.int)

-- fetchLogin : Cmd Msg
-- fetchLogin =
--   Http.send fetchUser1 fetchRandomQuote
--
--
-- fetchUser1 : Model -> Result Http.Error String -> ( Model, Cmd Msg )
-- fetchUser1 model result =
--   case result of
--     Ok newQuote ->
--       ( { model | name = newQuote }, Cmd.none )
--
--     Err _ ->
--       ( model, Cmd.none )
--
--
-- fetchRandomQuote : Http.Request String
-- fetchRandomQuote =
--   decoder "http://localhost:4000/players/1"
