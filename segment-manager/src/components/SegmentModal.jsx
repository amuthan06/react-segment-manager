import { useState, useRef } from 'react';
import { schemaOptions } from '../constants/schemaOptions';

export default function SegmentModal({ show, onClose, showToast }) {
  const [segmentName, setSegmentName] = useState("");
  const [mainSelected, setMainSelected] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const webhookUrl = "http://localhost:3001/send-to-webhook";

  const modalRef = useRef();

  // Close modal if clicking outside content
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Main dropdown excludes schemas already selected
  const mainDropdownOptions = schemaOptions.filter(
    (opt) => !selectedSchemas.includes(opt.value)
  );

  const addSchema = () => {
    if (mainSelected && !selectedSchemas.includes(mainSelected)) {
      setSelectedSchemas([...selectedSchemas, mainSelected]);
      setMainSelected("");
    }
  };

  const updateSchema = (index, newValue) => {
    if (selectedSchemas.includes(newValue)) return;
    let newSelectedSchemas = [...selectedSchemas];
    newSelectedSchemas[index] = newValue;
    setSelectedSchemas(newSelectedSchemas);
  };

  const removeSchema = (index) => {
    setSelectedSchemas((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const saveSegment = async () => {
    if (!segmentName.trim()) {
      showToast("Segment name is required.", "error");
      return;
    }
    if (selectedSchemas.length === 0) {
      showToast("Please add at least one schema.", "error");
      return;
    }
    const payload = {
      segment_name: segmentName.trim(),
      schema: selectedSchemas.map(val => {
        const found = schemaOptions.find(opt => opt.value === val);
        return found ? { [found.value]: found.label } : null;
      }).filter(Boolean),
    };
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        showToast("Segment saved successfully!", "success");
        onClose();
        setSegmentName("");
        setSelectedSchemas([]);
      } else {
        showToast("Error saving segment data.", "error");
      }
    } catch (error) {
      showToast("Error saving segment data.", "error");
      console.error(error);
    }
  };

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-20"
        onMouseDown={handleOverlayClick}
      ></div>
      <div className="fixed inset-0 flex justify-center items-center z-30">
        <div
          className="bg-white p-6 rounded w-96"
          ref={modalRef}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <label className="block mb-2 font-semibold">
            Segment Name:
            <input
              type="text"
              className="border p-2 w-full mt-1 mb-4"
              placeholder="Enter segment name"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </label>
          <label className="block mb-2 font-semibold">
            Add schema to segment:
            <select
              className="border p-2 w-full mt-1 mb-2"
              value={mainSelected}
              onChange={(e) => setMainSelected(e.target.value)}
            >
              <option value="">Select schema</option>
              {mainDropdownOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            className="text-blue-700 underline mb-4"
            onClick={addSchema}
            disabled={!mainSelected}
          >
            + Add new schema
          </button>
          {selectedSchemas.length > 0 && (
            <div className={`border border-blue-500 p-3 rounded mb-4 bg-blue-50 ${
              selectedSchemas.length > 5 ? "max-h-64 overflow-y-auto" : ""
            }`}>
              {selectedSchemas.map((schemaValue, index) => {
                const optionsForDropdown = schemaOptions.filter(opt =>
                  !selectedSchemas.includes(opt.value) || opt.value === schemaValue
                );
                return (
                  <div key={index} className="mb-2 flex items-center">
                    <select
                      className="border p-2 w-full"
                      value={schemaValue}
                      onChange={(e) => updateSchema(index, e.target.value)}
                    >
                      {optionsForDropdown.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeSchema(index)}
                      className="ml-2 text-xl text-red-600 font-bold focus:outline-none"
                      title="Remove"
                    >
                      −
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex justify-between">
            <button
              className="bg-green-700 text-white px-4 py-2 rounded"
              onClick={saveSegment}
            >
              Save the segment
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
