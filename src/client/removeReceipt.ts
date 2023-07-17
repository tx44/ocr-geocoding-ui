import axios from "axios";

export const removeReceipt = async (id: string): Promise<void> => {
    axios.delete<boolean>(`/api/veryfi/remove/${id}`);
};
