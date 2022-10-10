import React, { useState } from "react";

type FilterProps = {
  yearRelease: {
    from: number;
    to: number;
  };
};

type FilterInputs = {
  yearFrom: string;
  yearTo: string;
};

type ErrorProps = {
  [key: string]: undefined | string;
};

interface FilterModalProps {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filter: (values: FilterProps) => void;
  filterInputs: FilterInputs;
  setFilterInputs: React.Dispatch<React.SetStateAction<FilterInputs>>;
}

export const FilterMovies = ({
  setModalIsOpen,
  filter,
  filterInputs,
  setFilterInputs,
}: FilterModalProps) => {
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [errors, setErrors] = useState<ErrorProps>({
    yearTo: undefined,
    yearFrom: undefined,
  });

  const currentYear = new Date().getFullYear();

  const removeError = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors[e.target.name] &&
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const submit = () => {
    const yearFrom = Number(filterInputs.yearFrom);
    const yearTo = Number(filterInputs.yearTo);

    if (yearFrom === 0 && yearTo === 0) {
      setModalIsOpen(false);
      return;
    }

    if (`${yearFrom}`.length > 4) {
      setErrors((prev) => ({
        ...prev,
        yearFrom: "Invalid field",
      }));
      return;
    }

    if (`${yearTo}`.length > 4) {
      setErrors((prev) => ({
        ...prev,
        yearTo: "Invalid field",
      }));
      return;
    }

    if (yearTo < yearFrom) {
      setErrors((prev) => ({
        ...prev,
        yearFrom: 'This field cannot be longer than the "to" field',
      }));
      return;
    }

    if (yearFrom > yearTo) {
      setErrors((prev) => ({
        ...prev,
        yearFrom: 'This field cannot be longer than the "to" field',
      }));
      return;
    }

    localStorage.setItem(
      "start-wars.filter",
      JSON.stringify({
        year: {
          from: yearFrom,
          to: yearTo,
        },
      })
    );

    filter({
      yearRelease: {
        from: yearFrom,
        to: yearTo,
      },
    });
    setModalIsOpen(false);
  };

  return (
    <>
      <div
        className="fixed w-full h-screen bg-black/90 z-10"
        onClick={() => setModalIsOpen(false)}
      />
      <div className="max-w-[300px] w-full fixed bottom-2/4 right-2/4 translate-x-2/4 translate-y-2/4 p-5 rounded bg-black z-10 border border-stone-700 text-white flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">Year of release:</h3>

          <div className="flex gap-5">
            <div>
              <label htmlFor="releaseFrom" className="text-md font-light">
                From:
              </label>
              <input
                value={filterInputs.yearFrom}
                onChange={handleInputs}
                type="number"
                name="yearFrom"
                id="releaseFrom"
                className="w-full bg-transparent border border-stone-700 rounded outline-none text-sm text-white px-5 py-2 focus:border-sky-400 appearance-none"
                placeholder="min: 1980"
                min={1980}
                style={
                  errors.yearTo ? { border: "1px solid rgb(239 68 68)" } : {}
                }
              />
              {errors?.yearFrom && (
                <p className="text-red-500 text-sm font-light">
                  {errors.yearFrom}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="releaseFrom" className="text-md">
                To:
              </label>
              <input
                value={filterInputs.yearTo}
                onChange={handleInputs}
                type="number"
                name="yearTo"
                id="releaseTo"
                className="w-full bg-transparent border border-stone-700 rounded outline-none text-sm text-white px-5 py-2 focus:border-sky-400 input-number-appearance-none"
                placeholder={`max: ${currentYear}`}
                max={currentYear}
                onFocus={removeError}
                style={
                  errors.yearTo ? { border: "1px solid rgb(239 68 68)" } : {}
                }
              />
              {errors?.yearTo && (
                <p className="text-red-500 text-sm font-light">
                  {errors.yearTo}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          className="w-full bg-white text-black px-2 py-1 font-medium rounded"
          onClick={submit}
        >
          Filter
        </button>
      </div>
    </>
  );
};
