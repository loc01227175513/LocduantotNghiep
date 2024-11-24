"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Sortable from 'sortablejs';

const NoiDungBaiHoc = ({
  items,
  setItems,
  setIsSubModalOpen,
  setCurrentItemId,
  handleRemoveItem,
  handleRemoveSubItem,
  currentSubItemId,
  currentItemId,
  id,
  setIsModalOpen,
  handleAddItem,
  newItemName,
  setNewItemName,
  isModalOpen,
  handleAddSubItem,
  isSubModalOpen,
  newSubItemName,
  setNewSubItemName,
  handleExpandLesson,
  isContentModalOpen,
  setIsContentModalOpen,
  newContentUrl,
  setNewContentUrl,
  handleAddContent,
  extractVideoId,
  setCurrentSubItemId,
  handleMoveSubItem,
  updateSubItemOrder,
  updateSubItemParent,
}) => {

  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === 'lesson') {
      const reorderedItems = Array.from(items);
      const [movedItem] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, movedItem);
      setItems(reorderedItems);
      updateLessonOrder(reorderedItems);
      return;
    }

    if (type === 'subItem') {
      const sourceLessonIndex = items.findIndex(item => item.id.toString() === source.droppableId);
      const destinationLessonIndex = items.findIndex(item => item.id.toString() === destination.droppableId);

      if (sourceLessonIndex === -1 || destinationLessonIndex === -1) {
        console.error('Invalid droppableId');
        return;
      }

      const sourceSubItems = Array.from(items[sourceLessonIndex].subItems);
      const [movedSubItem] = sourceSubItems.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceSubItems.splice(destination.index, 0, movedSubItem);
        const updatedItems = Array.from(items);
        updatedItems[sourceLessonIndex].subItems = sourceSubItems;
        setItems(updatedItems);

        updateSubItemOrder(source.droppableId, null);
      } else {
        const destinationSubItems = Array.from(items[destinationLessonIndex].subItems);
        destinationSubItems.splice(destination.index, 0, movedSubItem);
        const updatedItems = Array.from(items);
        updatedItems[sourceLessonIndex].subItems = sourceSubItems;
        updatedItems[destinationLessonIndex].subItems = destinationSubItems;
        setItems(updatedItems);

        updateSubItemOrder(source.droppableId, null);
        updateSubItemOrder(destination.droppableId, null);
        updateSubItemParent(movedSubItem.id, destination.droppableId);
      }
    }
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="lessons" type="lesson">
      {(provided) => (
        <div
          id="hs-nested-sortable"
          className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {items.length === 0 ? (
            <div className="p-4 text-gray-500 text-center border-2 border-dashed border-gray-200 rounded-lg">
              No lessons available. Click &quot;Thêm Phần&quot; to add your first lesson.
            </div>
          ) : (
            items.map((item, index) => (
              item && item.name && (
                <Draggable key={`lesson-${item.id}`} draggableId={`lesson-${item.id}`} index={index}>
                  {(provided) => (
                    <div
                      className="mb-6 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700"
                        {...provided.dragHandleProps}
                      >
                        <span className="font-semibold text-white text-2xl">{item.name}</span>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => {
                              setIsSubModalOpen(true);
                              setCurrentItemId(item.id);
                            }}
                            className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-white rounded-full hover:bg-blue-50 transition-colors"
                          >
                            + Thêm Sub Item
                          </button>
                          <button
                            onClick={() => handleExpandLesson(item.id)}
                            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors"
                          >
                            Mở rộng
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-400 transition-colors"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>

                      <Droppable droppableId={`${item.id}`} type="subItem">
                        {(provided) => (
                          <div
                            className="p-4 space-y-3"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            data-parent-id={item.id}
                          >
                            {item.subItems.map((subItem, subIndex) => (
                              subItem && subItem.name && (
                                <Draggable
                                  key={`subItem-${subItem.id}`}
                                  draggableId={`subItem-${subItem.id}`}
                                  index={subIndex}
                                >
                                  {(provided) => (
                                    <div
                                      className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-200"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      data-id={subItem.id}
                                    >
                                      <span className="text-gray-700 font-medium">{subItem.name}</span>
                                      <div className="flex space-x-2">
                                        <button
                                          onClick={() => {
                                            setIsContentModalOpen(true);
                                            setCurrentSubItemId(subItem.id);
                                          }}
                                          className="px-3 py-1 text-sm text-yellow-600 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors"
                                        >
                                          Nội Dung
                                        </button>
                                        <button
                                          onClick={() => handleRemoveSubItem(item.id, subItem.id)}
                                          className="px-3 py-1 text-sm text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                                        >
                                          Xóa
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              )
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              )
            ))
          )}
          {provided.placeholder}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 mt-6 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            + Thêm Phần Mới
          </button>
            {isModalOpen && (
              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75 modal">
                <div className="p-5 bg-white rounded-lg">
                  <h2 className="mb-4 text-xl text-black">Nhập tên phần mới</h2>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full p-2 bg-red-500 border border-black"
                    placeholder="Tên phần"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 mr-2 bg-gray-300 rounded"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleAddItem}
                      className="p-2 text-white bg-blue-500 rounded"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isSubModalOpen && (
              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75 modal">
                <div className="p-5 bg-white rounded-lg">
                  <h2 className="mb-4 text-xl text-black">Nhập tên Sub Item mới</h2>
                  <input
                    type="text"
                    value={newSubItemName}
                    onChange={(e) => setNewSubItemName(e.target.value)}
                    className="w-full p-2 bg-red-500 border border-black"
                    placeholder="Tên Sub Item"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setIsSubModalOpen(false)}
                      className="p-2 mr-2 bg-gray-300 rounded"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleAddSubItem(currentItemId)}
                      className="p-2 text-white bg-blue-500 rounded"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isContentModalOpen && (
              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75 modal">
                <div className="p-5 bg-white rounded-lg">
                  <h2 className="mb-4 text-xl text-black">Nhập URL nội dung mới</h2>
                  <input
                    type="text"
                    value={newContentUrl}
                    onChange={(e) => setNewContentUrl(e.target.value)}
                    className="w-full p-2 mt-2 bg-red-500 border border-black"
                    placeholder="URL"
                  />
                  {newContentUrl && (
                    <iframe
                      id="youtube-player"
                      width="100%"
                      height="400"
                      src={`https://www.youtube.com/embed/${extractVideoId(newContentUrl)}?enablejsapi=1`}
                      title="YouTube Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setIsContentModalOpen(false)}
                      className="p-2 mr-2 bg-gray-300 rounded"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleAddContent(currentSubItemId)}
                      className="p-2 text-white bg-blue-500 rounded"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};



const BaiHoc = () => {
  const [id, setId] = useState(null);
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newSubItemName, setNewSubItemName] = useState("");
  const [newContentUrl, setNewContentUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentSubItemId, setCurrentSubItemId] = useState(null);
  const [expandedLessonId, setExpandedLessonId] = useState(null);
  const [duration, setDuration] = useState(null);
  const [highestId, setHighestId] = useState(0);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const idFromUrl = url.searchParams.get("id");
      setId(idFromUrl);
      console.log("id:", idFromUrl);
    }
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      if (id) {
        try {
          const response = await Axios.post(
            "https://huuphuoc.id.vn/api/showBaiHoc",
            { id_khoahoc: id },
            { referrerPolicy: 'unsafe-url' }
          );

          const lessons = response.data.data.map((lesson) => ({
            id: lesson.id,
            name: lesson.ten,
            subItems: lesson.subItems || [],
          }));
          setItems(lessons);

          const maxId = lessons.reduce(
            (max, lesson) => (lesson.id > max ? lesson.id : max),
            0
          );
          setHighestId(maxId);
        } catch (error) {
          console.error("Error fetching lessons:", error);
        }
      }
    };

    fetchLessons();
  }, [id]);

  const updateLessonOrder = useCallback(async (reorderedItems) => {
    try {
      const lessons = reorderedItems
        .filter((item) => item && item.id)
        .map((item, index) => ({
          id_baihoc: item.id,
          id_khoahoc: id,
          order: index + 1,
        }));

      console.log("Dữ liệu gửi lên:", { baihocs: lessons, id_khoahoc: id });

      await Axios.post(
        "https://huuphuoc.id.vn/api/keoThaBaiHoc",
        { baihocs: lessons },
        { referrerPolicy: 'unsafe-url' }
      );

      console.log("Cập nhật thứ tự thành công!");
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
      } else {
        console.error("Error updating lesson order:", error);
      }
    }
  }, [id]);

  const updateSubItemOrder = useCallback(async (parentId, container) => {
    try {
      const subItems = items.find(item => item.id.toString() === parentId.toString()).subItems;

      const orderedSubItems = subItems.map((subItem, index) => ({
        id_video: subItem.id,
        order: index + 1,
        id_baihoc: parentId,
      }));

      console.log("Prepared Payload:", { videos: orderedSubItems });

      await Axios.post(
        "https://huuphuoc.id.vn/api/sapXepThuTuVideo",
        { videos: orderedSubItems },
        { referrerPolicy: 'unsafe-url' }
      );

      console.log("Update successful!");
    } catch (error) {
      if (error.response) {
        console.error("Error Status:", error.response.status);
        console.error("Error Data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request setup error:", error.message);
      }
    }
  }, [items]);

  const updateSubItemParent = useCallback(async (subItemId, newParentId) => {
    try {
      console.log("Starting updateSubItemParent");
      console.log("subItemId:", subItemId);
      console.log("newParentId:", newParentId);

      await Axios.post(
        "https://huuphuoc.id.vn/api/diChuyenVideo",
        { video_id: subItemId, new_baihoc_id: newParentId },
        { referrerPolicy: 'unsafe-url' }
      );

      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) => {
          if (item.id === newParentId) {
            const parentItem = prevItems.find((i) =>
              i.subItems.some((sub) => sub.id === subItemId)
            );
            const movedSubItem = parentItem.subItems.find(
              (sub) => sub.id === subItemId
            );

            return { ...item, subItems: [...item.subItems, movedSubItem] };
          } else if (item.subItems.some((sub) => sub.id === subItemId)) {
            return { ...item, subItems: item.subItems.filter((sub) => sub.id !== subItemId) };
          }
          return item;
        });

        console.log("Updated items:", updatedItems);
        return updatedItems;
      });

      const container = document.querySelector(`[data-parent-id="${newParentId}"]`);
      if (container) {
        await updateSubItemOrder(newParentId, container);
      } else {
        console.error("Container not found for parentId:", newParentId);
      }

      console.log("Sub item đã được di chuyển thành công");
    } catch (error) {
      console.error("Error moving sub item:", error);
    }
  }, [updateSubItemOrder]);

  const handleMoveSubItem = (subItemId, sourceParentId, targetParentId) => {
    setItems(prevItems => {
      const sourceItem = prevItems.find(item => item.id === sourceParentId);
      const targetItem = prevItems.find(item => item.id === targetParentId);

      if (!sourceItem || !targetItem) {
        console.error('Source or target item not found');
        return prevItems;
      }

      const subItem = sourceItem.subItems.find(sub => sub.id === subItemId);
      if (!subItem) {
        console.error('Sub item not found in source');
        return prevItems;
      }

      const updatedSourceSubItems = sourceItem.subItems.filter(sub => sub.id !== subItemId);
      const updatedTargetSubItems = [...targetItem.subItems, subItem];

      return prevItems.map(item => {
        if (item.id === sourceParentId) {
          return { ...item, subItems: updatedSourceSubItems };
        }
        if (item.id === targetParentId) {
          return { ...item, subItems: updatedTargetSubItems };
        }
        return item;
      });
    });
  };

  const moveSubItem = useCallback(async (subItemId, sourceParentId, targetParentId, container) => {
    try {
      await Axios.post(
        "https://huuphuoc.id.vn/api/diChuyenVideo",
        { video_id: subItemId, new_baihoc_id: targetParentId },
        { referrerPolicy: 'unsafe-url' }
      );

      setItems(prevItems => {
        const sourceItem = prevItems.find(item => item.id === sourceParentId);
        const targetItem = prevItems.find(item => item.id === targetParentId);

        if (!sourceItem || !targetItem) {
          console.error('Source or target item not found');
          return prevItems;
        }

        const subItem = sourceItem.subItems.find(sub => sub.id === subItemId);

        if (!subItem) {
          console.error('Sub item not found in source');
          return prevItems;
        }

        const updatedSourceSubItems = sourceItem.subItems.filter(sub => sub.id !== subItemId);
        const updatedTargetSubItems = [...targetItem.subItems, subItem];

        return prevItems.map(item => {
          if (item.id === sourceParentId) {
            return { ...item, subItems: updatedSourceSubItems };
          }
          if (item.id === targetParentId) {
            return { ...item, subItems: updatedTargetSubItems };
          }
          return item;
        });
      });

      await updateSubItemOrder(targetParentId, container);

      console.log("Sub item moved successfully");
    } catch (error) {
      console.error("Error moving sub item:", error);
    }
  }, [updateSubItemOrder]);

  useEffect(() => {
    const sortables = document.querySelectorAll(".nested-sortable");
    const sortableInstances = [];

    sortables.forEach((sortable) => {
      const instance = new Sortable(sortable, {
        group: "nested",
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        onEnd: async (event) => {
          const oldParentId = parseInt(event.from.dataset.parentId);
          const newParentId = parseInt(event.to.dataset.parentId);
          const subItemId = parseInt(event.item.dataset.id);

          if (oldParentId !== newParentId) {
            try {
              await moveSubItem(subItemId, oldParentId, newParentId, event.to);
            } catch (error) {
              console.error("Error moving sub-item:", error);
            }
          } else {
            try {
              await updateSubItemOrder(newParentId, event.to);
            } catch (error) {
              console.error("Error updating sub-item order:", error);
            }
          }
        },
      });
      sortableInstances.push(instance);
    });

    const mainElement = document.getElementById("hs-nested-sortable");
    if (mainElement) {
      const mainSortable = new Sortable(mainElement, {
        animation: 150,
        onEnd: async (event) => {
          const reorderedItems = [...items];
          const [movedItem] = reorderedItems.splice(event.oldIndex, 1);
          reorderedItems.splice(event.newIndex, 0, movedItem);
          setItems(reorderedItems);

          try {
            await updateLessonOrder(reorderedItems);
          } catch (error) {
            console.error("Error updating lesson order:", error);
          }
        },
      });
      sortableInstances.push(mainSortable);
    }

    return () => {
      sortableInstances.forEach((instance) => instance.destroy());
    };
  }, [items, updateLessonOrder, updateSubItemOrder, moveSubItem]);

  const handleRemoveSubItem = useCallback(async (itemId, subItemId) => {
    try {
      const response = await Axios.post(
        "https://huuphuoc.id.vn/api/Xoasub",
        { id_video: subItemId },
        { referrerPolicy: 'unsafe-url' }
      );
  
      if (response.status === 200) {
        setItems((prevItems) =>
          prevItems.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                subItems: item.subItems.filter((sub) => sub.id !== subItemId),
              };
            }
            return item;
          })
        );
        console.log("Sub-item đã được xóa thành công");
      } else {
        console.error("Failed to delete sub-item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting sub-item:", error);
    }
  }, [setItems]);

  const handleRemoveItem = useCallback(async (itemId) => {
    if (!itemId) return;

    const itemToRemove = items.find((item) => item && item.id === itemId);

    if (itemToRemove && itemToRemove.subItems.length > 0) {
      alert("Vui lòng xóa các mục con trước khi xóa mục chính.");
      return;
    }

    try {
      const response = await Axios.post(
        "https://huuphuoc.id.vn/api/xoabaihoc",
        { id_baihoc: itemId },
        { referrerPolicy: 'unsafe-url' }
      );

      if (response.status === 200) {
        setItems((prevItems) =>
          prevItems.filter((item) => item && item.id !== itemId)
        );
        console.log("Bài học đã được xóa thành công");
      } else {
        console.error("Failed to delete lesson:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  }, [items]);
  const addLessonToCourse = useCallback(async (lessonName) => {
    if (id) {
      try {
        await Axios.post(
          "https://huuphuoc.id.vn/api/themBaiHoc",
          {
            id_khoahoc: id,
            ten: lessonName,
          },
          {
            referrerPolicy: 'unsafe-url'
          }
        );
      } catch (error) {
        console.error("Error adding lesson:", error);
      }
    }
  }, [id]);
  const handleAddItem = useCallback(async () => {
    if (newItemName.trim()) {
      try {
        const newId = highestId + 1;
        await addLessonToCourse(newItemName, newId);
        setItems([
          ...items.filter((item) => item !== null),
          { id: newId, name: newItemName, subItems: [] },
        ]);
        setNewItemName("");
        setIsModalOpen(false);
        setHighestId(newId);

        if (items.filter((item) => item !== null).length === 0) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error adding lesson:", error);
      }
    }
    addLessonToCourse("Example Lesson");
  }, [items, newItemName, highestId, addLessonToCourse]);

  const handleAddSubItem = useCallback(async (itemId) => {
    if (newSubItemName.trim()) {
      try {
        const response = await Axios.post(
          "https://huuphuoc.id.vn/api/themSubBaiHoc",
          {
            ten: newSubItemName,
            id_baihoc: itemId,
          },
          {
            referrerPolicy: 'unsafe-url'
          }
        );
  
        const newSubItem = response.data.data;
        setItems(
          items.map((item) => {
            if (item && item.id === itemId) {
              return {
                ...item,
                subItems: [
                  ...item.subItems,
                  { id: newSubItem.id, name: newSubItem.ten, order: item.subItems.length + 1 },
                ],
              };
            }
            return item;
          })
        );
        setNewSubItemName("");
        setIsSubModalOpen(false);
      } catch (error) {
        console.error("Error adding sub item:", error);
      }
    }
  }, [items, newSubItemName]);

  const fetchSubItems = useCallback(async (id_baihoc) => {
    try {
      const response = await Axios.post(
        "https://huuphuoc.id.vn/api/ShowSubBaiHoc",
        {
          id_baihoc: id_baihoc,
        },
        {
          referrerPolicy: 'unsafe-url'
        }
      );

      const subItems = response.data.data.map((subItem) => ({
        id: subItem.id,
        name: subItem.ten,
      }));

      setItems(
        items.map((item) => {
          if (item && item.id === id_baihoc) {
            return {
              ...item,
              subItems: subItems,
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error("Error fetching sub items:", error);
    }
  }, [items]);

  const handleExpandLesson = useCallback((itemId) => {
    setExpandedLessonId(itemId);
    fetchSubItems(itemId);
  }, [fetchSubItems]);

  const handleAddContent = useCallback(async (subItemId) => {
    if (newContentUrl.trim()) {
      const videoId = extractVideoId(newContentUrl);
      if (videoId) {
        try {
          console.log("Extracted videoId:", videoId);
          const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=AIzaSyBoFccofvQSQ5Y0l29SdeRD7hka5lL9-fk`;
          console.log("API URL:", apiUrl);
          const response = await Axios.get(apiUrl);
          const isoDuration = response.data.items[0].contentDetails.duration;
          const durationInSeconds = parseISO8601Duration(isoDuration);
          const durationInHHMMSS = convertSecondsToHHMMSS(durationInSeconds);
          setDuration(durationInHHMMSS);

          const payload = {
            id_video: subItemId,
            thoiluong: durationInHHMMSS,
            url: videoId,
          };

          console.log("Payload:", payload);

          await Axios.post("https://huuphuoc.id.vn/api/taonoidungsub", payload, {
            referrerPolicy: 'unsafe-url'
          });
          console.log(`Adding content to sub-item ID ${subItemId}`);
          setNewContentUrl("");
          setIsContentModalOpen(false);
        } catch (error) {
          if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
          } else if (error.request) {
            console.error("Error request:", error.request);
          } else {
            console.error("Error message:", error.message);
          }
          console.error("Error config:", error.config);
        }
      } else {
        console.error("Invalid YouTube URL:", newContentUrl);
      }
    } else {
      console.error("Content URL is invalid");
    }
  }, [newContentUrl]);

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };



  const parseISO8601Duration = (isoDuration) => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = regex.exec(isoDuration);

    const hours = parseInt(matches[1] || 0, 10);
    const minutes = parseInt(matches[2] || 0, 10);
    const seconds = parseInt(matches[3] || 0, 10);

    return hours * 3600 + minutes * 60 + seconds;
  };

  const convertSecondsToHHMMSS = (seconds) => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  return (
    <NoiDungBaiHoc
      items={items}
      setItems={setItems}
      setIsSubModalOpen={setIsSubModalOpen}
      setCurrentItemId={setCurrentItemId}
      handleRemoveItem={handleRemoveItem}
      handleRemoveSubItem={handleRemoveSubItem}
      currentSubItemId={currentSubItemId}
      currentItemId={currentItemId}
      id={id}
      setIsModalOpen={setIsModalOpen}
      handleAddItem={handleAddItem}
      newItemName={newItemName}
      setNewItemName={setNewItemName}
      isModalOpen={isModalOpen}
      handleAddSubItem={handleAddSubItem}
      isSubModalOpen={isSubModalOpen}
      newSubItemName={newSubItemName}
      setNewSubItemName={setNewSubItemName}
      handleExpandLesson={handleExpandLesson}
      isContentModalOpen={isContentModalOpen}
      setIsContentModalOpen={setIsContentModalOpen}
      newContentUrl={newContentUrl}
      setNewContentUrl={setNewContentUrl}
      handleAddContent={handleAddContent}
      extractVideoId={extractVideoId}
      setCurrentSubItemId={setCurrentSubItemId}
      handleMoveSubItem={handleMoveSubItem}
      updateSubItemOrder={updateSubItemOrder}
      updateSubItemParent={updateSubItemParent}
    />
  );
};

export default BaiHoc;