module Routes exposing (..)

-- import Navigation exposing (Location)
import Browser.Navigation as Nav
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser, oneOf, s, string)
import Html exposing (Attribute)
import Html.Attributes as Attr

type Route
    = Home
    | Login
    | Logout
    | Register
    | Error

-- parseLocation : Url -> Route
-- parseLocation url =
--   { url | path = Maybe.withDefault "" url.fragment, fragment = Nothing }
--         |> Parser.parse matchers

parseLocation : Url -> Route
parseLocation url =
    case Parser.parse matchers url of
        Just route ->
            route

        Nothing ->
            Error

href : Route -> Attribute msg
href targetRoute =
    Attr.href (path targetRoute)


matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ Parser.map Home Parser.top
        , Parser.map Home (s "posts")
        , Parser.map Login (s "login")
        , Parser.map Logout (s "logout")
        , Parser.map Register (s "register")
        , Parser.map Error (s "error")
        ]

path : Route -> String
path page =
    let
        pieces =
            case page of
                Home ->
                    []

                Error ->
                    []

                -- Root ->
                --     []

                Login ->
                    [ "signin" ]

                Logout ->
                    [ "signout" ]

                Register ->
                    [ "signup" ]

    in
    "#/" ++ String.join "/" pieces


-- module Routes exposing (Route(..), fromUrl, href, replaceUrl)
--
-- import Browser.Navigation as Nav
-- import Html exposing (Attribute)
-- import Html.Attributes as Attr
-- import Url exposing (Url)
-- import Url.Parser as Parser exposing ((</>), Parser, oneOf, s, string)
--
--
--
-- -- ROUTING
--
--
-- type Route
--     = Home
--     | Root
--     | Login
--     | Logout
--     | Register
--     | Error
--
--
-- parser : Parser (Route -> a) a
-- parser =
--     oneOf
--         [ Parser.map Home Parser.top
--         , Parser.map Login (s "signin")
--         , Parser.map Logout (s "signout")
--         , Parser.map Register (s "signup")
--         ]
--
--
--
-- -- PUBLIC HELPERS
--
--
-- href : Route -> Attribute msg
-- href targetRoute =
--     Attr.href (routeToString targetRoute)
--
--
-- replaceUrl : Nav.Key -> Route -> Cmd msg
-- replaceUrl key route =
--     Nav.replaceUrl key (routeToString route)
--
--
-- fromUrl : Url -> Maybe Route
-- fromUrl url =
--     -- The RealWorld spec treats the fragment like a path.
--     -- This makes it *literally* the path, so we can proceed
--     -- with parsing as if it had been a normal path all along.
--     { url | path = Maybe.withDefault "" url.fragment, fragment = Nothing }
--         |> Parser.parse parser
--
--
--
-- -- INTERNAL
--
--
-- routeToString : Route -> String
-- routeToString page =
--     let
--         pieces =
--             case page of
--                 Home ->
--                     []
--
--                 Root ->
--                     []
--
--                 Error ->
--                     []
--
--                 Login ->
--                     [ "signin" ]
--
--                 Logout ->
--                     [ "signout" ]
--
--                 Register ->
--                     [ "signup" ]
--
--     in
--     "#/" ++ String.join "/" pieces
