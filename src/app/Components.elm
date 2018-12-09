module Components exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Models exposing (Bundle)

layout : Html msg -> Html msg -> Html msg
layout header main =
    div []
        [ header, main ]

authHeader : Html msg
authHeader =
    header []
        [ nav []
            [ div [ class "nav-wrapper container" ]
                [ ul [ class "right" ]
                    [ li [] [ a [class "btn" ] [ text "Login" ] ]
                    , li [] [ a [class "btn" ] [ text "Sign Up" ] ]
                    ]
                ]
            ]
        ]

landingBody : List Bundle -> Html msg
landingBody posts =
    main_ [ class "container" ]
        [ List.map postCard posts
          |> div [ class "row" ]
        ]

postCard : Bundle -> Html msg
postCard post =
    div [ class "col s12 m6 l4" ]
        [ div [ class "card small hoverable grey lighten-4" ]
             [ div [ class "card-content" ]
                [ span [ class "card-title medium" ]
                    [ text <| "ID " ++ post.id ++ ": "++ post.client ]
                , p [] [ text post.description ]
                ]
             ]
        ]
