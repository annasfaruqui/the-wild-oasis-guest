import SubmitButton from "@/app/_components/SubmitButton";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import { updateReservation } from "@/app/_lib/actions";

export async function generateMetadata({ params }) {
  const { id } = await getBooking(params.reservationId);
  return {
    title: `Reservation #${id}`,
  };
}

async function Page({ params }) {
  const { reservationId } = params;
  const { cabinId, observations, numGuests } = await getBooking(reservationId);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateReservation}
        className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          />
        </div>

        <input type="hidden" name="bookingId" value={reservationId} />

        <div className="flex items-center justify-end gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </>
  );
}

export default Page;
