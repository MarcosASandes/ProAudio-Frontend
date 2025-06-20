import React from "react";
import TagsTree from "./../components/TagsTree";
import "../styles/tags.css";
import useGetAllTags from "../hooks/tags/useGetAllTags";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectTags,
  flattenTags,
  selectTagsLoading,
  selectTagsError,
} from "../features/tags/TagSelector";

const TagsPage = () => {
  const etiquetasAnidadasMock = {
    tags: [
      {
        tag_id: 1,
        name: "Tipo",
        description: "",
        status: "ENABLED",
        childrenTags: [
          {
            tag_id: 4,
            name: "Microfonía",
            description: "",
            status: "ENABLED",
            childrenTags: [
              {
                tag_id: 6,
                name: "Receptor",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 7,
                name: "Transmisor",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 71,
                name: "otra cosa",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
            ],
          },
          {
            tag_id: 5,
            name: "Monitoreo",
            description: "",
            status: "ENABLED",
            childrenTags: [
              {
                tag_id: 8,
                name: "In-Ear",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 9,
                name: "Over-Ear",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 14,
                name: "Capsula",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 15,
                name: "Palo",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 16,
                name: "Cable X",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 17,
                name: "Cable XY",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 18,
                name: "Cable XYZ",
                description: "",
                status: "ENABLED",
                childrenTags: [
                  {
                    tag_id: 19,
                    name: "Cable XYZ Plus",
                    description: "",
                    status: "ENABLED",
                    childrenTags: [],
                  },
                ],
              },
              {
                tag_id: 20,
                name: "Test1",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 21,
                name: "Test2",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 22,
                name: "Test3",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 23,
                name: "Test4",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 24,
                name: "Test5",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 25,
                name: "Test5",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 26,
                name: "Test6",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 27,
                name: "Test7",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 28,
                name: "Test8",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
              {
                tag_id: 29,
                name: "Test9",
                description: "",
                status: "ENABLED",
                childrenTags: [],
              },
            ],
          },
        ],
      },
      {
        tag_id: 2,
        name: "Marca",
        description: "",
        status: "ENABLED",
        childrenTags: [
          {
            tag_id: 10,
            name: "Shure",
            description: "",
            status: "ENABLED",
            childrenTags: [],
          },
          {
            tag_id: 11,
            name: "Sennheiser",
            description: "",
            status: "ENABLED",
            childrenTags: [],
          },
        ],
      },
      {
        tag_id: 3,
        name: "Modelo",
        description: "",
        status: "ENABLED",
        childrenTags: [
          {
            tag_id: 12,
            name: "SM58",
            description: "",
            status: "ENABLED",
            childrenTags: [],
          },
          {
            tag_id: 13,
            name: "Beta58A",
            description: "",
            status: "ENABLED",
            childrenTags: [],
          },
        ],
      },
    ],
  };

  const navigate = useNavigate();

  const handleGoToCreate = () => {
    navigate("/tag/create");
  };

  useGetAllTags();

  const nestedTags = useSelector(selectTags);
  const loading = useSelector(selectTagsLoading);
  const error = useSelector(selectTagsError);

  return (

    <div className="tags-page">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
        <h1 className="animated-underline m-0">Etiquetas</h1>
        <button className="btn btn-green-style" onClick={handleGoToCreate}>
          + Crear etiqueta
        </button>
      </div>

      {loading && <p className="text-light">Cargando etiquetas...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {!loading && !error && (
        <div className="tags-tree-wrapper">
          <div className="tags-tree-space">
            <TagsTree /* tags={nestedTags} */ />
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsPage;
