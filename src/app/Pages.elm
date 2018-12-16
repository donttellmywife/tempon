module Pages exposing (..)

import Html exposing (Html)
import Components exposing (..)
import Models exposing (..)
import Routes exposing (Route)


landing : Model -> Html msg
landing model =
    layout authHeader <| landingBody model.bundles


readBundle : String -> Model -> Html msg
readBundle id model =
    case List.head <| List.filter (\post -> post.id == id) model.bundles of
        Just post ->
            layout authHeader <| readBundleDescription post

        Nothing ->
            error "404 Not Found"


createBundle: Model -> Html msg
createBundle model =
    layout (userHeader model.user) createBundleBody


login: Model -> Html msg
login model =
  Components.login


signUp : Model -> Html msg
signUp model =
  Components.signUp


error : a -> Html msg
error err =
  Components.error err


view : Model -> Html msg
view model =
    case model.route of
        Routes.Home ->
            landing model

        -- Routes.Root ->
        --     landing model

        Routes.Login ->
            login model

        Routes.Logout ->
            login model

        Routes.Register ->
            signUp model

        Routes.Error ->
            error "404 Not Found"
