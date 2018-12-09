module Pages exposing (..)

import Html exposing (Html)
import Components exposing (..)
import Models exposing (..)


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


error : a -> Html msg
error err = Components.error err
