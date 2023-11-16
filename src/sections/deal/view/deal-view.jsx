/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
// import Autocomplete from '@mui/material/Autocomplete';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';
// import { companies } from 'src/_mock/company';

import { toast } from 'react-toastify';
import { MuiFileInput } from 'mui-file-input';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { SET_DEALS } from 'src/redux/types';
import { addDeal, uploadFiles } from 'src/api/server';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../deal-no-data';
import DealTableRow from '../deal-table-row';
import DealTableHead from '../deal-table-head';
import TableEmptyRows from '../deal-empty-rows';
import DealTableToolbar from '../deal-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
// ----------------------------------------------------------------------

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '96%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

export default function DealView() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const deals = useSelector((state) => state.deals);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [pastProjects, setPastProjects] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [errMainImage, setErrMainImage] = useState(false);
    const [title, setTitle] = useState('');
    const [errTitle, setErrTitle] = useState(false);
    const [description, setDescription] = useState('');
    const [errDesc, setErrDesc] = useState(false);
    const [businessPlan, setBusinessPlan] = useState('');
    const [errBusinessPlan, setErrBusinessPlan] = useState(false);
    const [fundingGoal, setFundingGoal] = useState('');
    const [errFundingGoal, setErrFundingGoal] = useState(false);
    const [valuation, setValuation] = useState('');
    const [errValuatin, setErrValuatin] = useState(false);
    const [revenue, setRevenue] = useState('');
    const [financialProjections, setFinancialProjections] = useState('');
    const [investmentType, setInvestmentType] = useState('');
    const [errInvestmentType, setErrInvestmentType] = useState(false);
    const [investmentTerms, setInvestmentTerms] = useState('');
    const [errInvestmentTerms, setErrInvestmentTerms] = useState(false);
    const [ownershipPercentageOffered, setOwnershipPercentageOffered] = useState('');
    const [errOwnershipPercentageOffered, setErrOwnershipPercentageOffered] = useState(false);
    const [useOfFunds, setUseOfFunds] = useState('');
    const [transactionAndMiletones, setTransactionAndMiletones] = useState('');
    const [termsAndConditions, setTermsAndConditions] = useState('');
    const [errTermsAndConditions, setErrTermsAndConditions] = useState(false);
    const [securitiesFilings, setSecuritiesFilings] = useState('');
    const [errSecuritiesFilings, setErrSecuritiesFilings] = useState(false);
    const [regulatoryComplianceDetailss, setRegulatoryComplianceDetails] = useState('');
    const [errRegulatoryComplianceDetails, setErrRegulatoryComplianceDetails] = useState(false);
    const [attachmentUrl, setAttachmentUrl] = useState(null);
    const [errAttachmentUrl, setErrAttachmentUrl] = useState(false);
    const [risksAndDisclaimers, setRisksAndDisclaimerss] = useState('');
    const [errRisksAndDisclaimers, setErrRisksAndDisclaimers] = useState(false);
    const [dueDiligenceMaterials, setDueDiligenceMaterials] = useState('');
    const [errDueDiligenceMaterials, setErrDueDiligenceMaterials] = useState(false);
    const [investorEligibilitys, setInvestorEligibilitys] = useState('');
    const [errInvestorEligibilitys, setErrInvestorEligibilitys] = useState(false);
    const [minInvestmentAmount, setMinInvestmentAmount] = useState('');
    const [errMinInvestmentAmount, setErrMinInvestmentAmount] = useState(false);
    const [maxInvestmentAmount, setMaxInvestmentAmount] = useState('');
    const [errMaxInvestmentAmount, setErrMaxInvestmentAmount] = useState(false);
    const [dealsDuration, setDealDuration] = useState('');
    const [errDealDuration, setErrDealDuration] = useState(false);

    const onSubmit = () => {
        if (!mainImage) setErrMainImage(true);
        else setErrMainImage(false);
        if (!title) setErrTitle(true);
        else setErrTitle(false);
        if (!description) setErrDesc(true);
        else setErrDesc(false);
        if (!businessPlan) setErrBusinessPlan(true);
        else setErrBusinessPlan(false);
        if (!fundingGoal) setErrFundingGoal(true);
        else setErrFundingGoal(false);
        if (!valuation) setErrValuatin(true);
        else setErrValuatin(false);
        if (!investmentType) setErrInvestmentType(true);
        else setErrInvestmentType(false);
        if (!investmentTerms) setErrInvestmentTerms(true);
        else setErrInvestmentTerms(false);
        if (!ownershipPercentageOffered) setErrOwnershipPercentageOffered(true);
        else setErrOwnershipPercentageOffered(false);
        if (!termsAndConditions) setErrTermsAndConditions(true);
        else setErrTermsAndConditions(false);
        if (!securitiesFilings) setErrSecuritiesFilings(true);
        else setErrSecuritiesFilings(false);
        if (!regulatoryComplianceDetailss) setErrRegulatoryComplianceDetails(true);
        else setErrRegulatoryComplianceDetails(false);
        if (!attachmentUrl) setErrAttachmentUrl(true);
        else setErrAttachmentUrl(false);
        if (!risksAndDisclaimers) setErrRisksAndDisclaimers(true);
        else setErrRisksAndDisclaimers(false);
        if (!dueDiligenceMaterials) setErrDueDiligenceMaterials(true);
        else setErrDueDiligenceMaterials(false);
        if (!investorEligibilitys || (investorEligibilitys.toLowerCase() !== 'yes' && investorEligibilitys.toLowerCase() !== 'no'))
            setErrInvestorEligibilitys(true);
        else setErrInvestorEligibilitys(false);
        if (!minInvestmentAmount || Number(minInvestmentAmount) < 0) setErrMinInvestmentAmount(true);
        else setErrMinInvestmentAmount(false);
        if (!maxInvestmentAmount || Number(maxInvestmentAmount) < 0 || minInvestmentAmount > maxInvestmentAmount) setErrMaxInvestmentAmount(true);
        else setErrMaxInvestmentAmount(false);
        if (!dealsDuration) setErrDealDuration(true);
        else setErrDealDuration(false);

        if (
            !title ||
            !description ||
            !businessPlan ||
            !fundingGoal ||
            !valuation ||
            !investmentType ||
            !investmentTerms ||
            !ownershipPercentageOffered ||
            !termsAndConditions ||
            !securitiesFilings ||
            !regulatoryComplianceDetailss ||
            !attachmentUrl ||
            !risksAndDisclaimers ||
            !dueDiligenceMaterials ||
            !investorEligibilitys ||
            !minInvestmentAmount ||
            !maxInvestmentAmount ||
            !dealsDuration
        ) {
            toast('Please fill all required fields', { type: 'error' });
        } else {
            uploadFiles(dispatch, [mainImage])
                .then((res) => {
                    const mainUrl = res.data[0].url;
                    uploadFiles(dispatch, attachmentUrl)
                        .then((res1) => {
                            const attachments = [];
                            attachmentUrl.map((att, i) => {
                                attachments.push({
                                    name: att.name,
                                    url: res1.data[i].url,
                                });
                                return null;
                            });
                            if (pastProjects) {
                                uploadFiles(dispatch, pastProjects)
                                    .then((res2) => {
                                        const pastProjectUrl = res2.data.map((att) => att.url);

                                        const request = {
                                            title,
                                            description,
                                            businessPlan,
                                            company: '654a87cbfe56fb2f739aafba',
                                            mainImage: mainUrl,
                                            financial: {
                                                fundingGoal,
                                                valuation,
                                                profit: revenue,
                                                projections: financialProjections,
                                            },
                                            dealStructure: {
                                                type: investmentType.split(','),
                                                terms: investmentTerms,
                                                ownershipPercentageOffered: Number(ownershipPercentageOffered),
                                            },
                                            useOfFunds,
                                            milestones: transactionAndMiletones,
                                            legalAndCompliance: {
                                                termsAndConditions,
                                                securities: securitiesFilings,
                                                complianceDetails: regulatoryComplianceDetailss,
                                                attachments,
                                                risksAndDisclaimers,
                                                diligenceMaterials: dueDiligenceMaterials,
                                            },
                                            investorEligibilty: investorEligibilitys.toLowerCase() === 'yes',
                                            minMaxInvestmentAmount: {
                                                min: Number(minInvestmentAmount),
                                                max: Number(maxInvestmentAmount),
                                            },
                                            dealDuration: dealsDuration,
                                            pastProjects: pastProjectUrl,
                                        };

                                        addDeal(dispatch, request)
                                            .then((response) => {
                                                setOpen(false);
                                                dispatch({
                                                    type: SET_DEALS,
                                                    payload: [...deals, response],
                                                });
                                                toast('New Deal added successfully!', { type: 'success' });
                                            })
                                            .catch((err) => {
                                                toast(err, { type: 'error' });
                                            });
                                    })
                                    .catch((err2) => {
                                        toast(err2, { type: 'error' });
                                    });
                            } else {
                                const request = {
                                    title,
                                    description,
                                    businessPlan,
                                    company: '654a87cbfe56fb2f739aafba',
                                    mainImage: mainUrl,
                                    financial: {
                                        fundingGoal,
                                        valuation,
                                        profit: revenue,
                                        projections: financialProjections,
                                    },
                                    dealStructure: {
                                        type: investmentType.split(','),
                                        terms: investmentTerms,
                                        ownershipPercentageOffered: Number(ownershipPercentageOffered),
                                    },
                                    useOfFunds,
                                    milestones: transactionAndMiletones,
                                    legalAndCompliance: {
                                        termsAndConditions,
                                        securities: securitiesFilings,
                                        complianceDetails: regulatoryComplianceDetailss,
                                        attachments,
                                        risksAndDisclaimers,
                                        diligenceMaterials: dueDiligenceMaterials,
                                    },
                                    investorEligibilty: investorEligibilitys.toLowerCase() === 'yes',
                                    minMaxInvestmentAmount: {
                                        min: Number(minInvestmentAmount),
                                        max: Number(maxInvestmentAmount),
                                    },
                                    dealDuration: dealsDuration,
                                    pastProjects: [],
                                };
                                addDeal(dispatch, request)
                                    .then((response) => {
                                        setOpen(false);
                                        dispatch({
                                            type: SET_DEALS,
                                            payload: [...deals, response],
                                        });
                                        toast('New Deal added successfully!', { type: 'success' });
                                    })
                                    .catch((err) => {
                                        toast(err, { type: 'error' });
                                    });
                            }
                        })
                        .catch((err1) => {
                            toast(err1, { type: 'error' });
                        });
                })
                .catch((err) => {
                    toast(err, { type: 'error' });
                });
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleRemove = () => {
        handleOpenDeleteModal();
    };

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = deals.map((n) => n.title);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
        inputData: deals,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const handleInvestmentAmount = (e, name) => {
        if (name === 'min') {
            if (e.target.value?.includes('$')) {
                if (!Number.isNaN(e.target.value?.substring(1))) {
                    setMinInvestmentAmount(Number(e.target.value.substring(1)));
                }
            } else if (!Number.isNaN(e.target.value)) {
                setMinInvestmentAmount(Number(e.target.value));
            }
        } else if (e.target.value?.includes('$')) {
            if (!Number.isNaN(e.target.value?.substring(1))) {
                setMaxInvestmentAmount(Number(e.target.value.substring(1)));
            }
        } else if (!Number.isNaN(e.target.value)) {
            setMaxInvestmentAmount(Number(e.target.value));
        }
    };

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Deals</Typography>

                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
                    New Deal
                </Button>
            </Stack>

            <Card>
                <DealTableToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <DealTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={deals.length}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: 'title', label: 'Title' },
                                    { id: 'budget', label: 'Budget' },
                                    { id: 'duration', label: 'Duration' },
                                    { id: 'company', label: 'Company' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <DealTableRow
                                        key={row.id}
                                        mainImage={row.mainImage}
                                        title={row.title}
                                        budget={`$${row.minMaxInvestmentAmount.min}-$${row.minMaxInvestmentAmount.max}`}
                                        duration={row.dealDuration}
                                        company={row.company.name}
                                        selected={selected.indexOf(row.title) !== -1}
                                        handleClick={(event) => handleClick(event, row.title)}
                                        handleRemove={handleRemove}
                                    />
                                ))}

                                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, users.length)} />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        New Deal
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                        Please fill all required fields
                    </Typography>
                    <Stack spacing={3} pt={2} pb={2} maxHeight={500} overflow="scroll">
                        <TextField name="title" required label="Title" value={title} error={errTitle} onChange={(e) => setTitle(e.target.value)} />
                        <TextField
                            name="description"
                            required
                            multiline
                            rows={4}
                            label="Description"
                            error={errDesc}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder=""
                        />
                        <TextField
                            name="businessPlan"
                            required
                            label="Business Plan"
                            error={errBusinessPlan}
                            value={businessPlan}
                            onChange={(e) => setBusinessPlan(e.target.value)}
                            placeholder="A document outlining the business's strategry, financials, and growth prospects."
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Copy and paste the business plan file link(We do not support file upload function for now)
                        </Typography>
                        <MuiFileInput
                            name="mainImage"
                            label="Deal Image"
                            value={mainImage}
                            variant="outlined"
                            required
                            error={errMainImage}
                            onChange={setMainImage}
                            InputProps={{
                                color: 'primary',
                                inputProps: {
                                    accept: 'image/*',
                                },
                                startAdornment: <Iconify icon="eva:attach-fill" />,
                            }}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Please choose an image for your deal(format: image/*)
                        </Typography>
                        {/* Dont remove below code this will be added in the future. */}
                        {/* <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={companies}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Company" />}
                        /> */}
                        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                            Financial Information:
                        </Typography>
                        <TextField
                            name="fundingGoal"
                            required
                            label="Funding Goal"
                            error={errFundingGoal}
                            value={fundingGoal}
                            onChange={(e) => setFundingGoal(e.target.value)}
                        />
                        <TextField
                            name="valuation"
                            required
                            label="Valuation"
                            error={errValuatin}
                            value={valuation}
                            onChange={(e) => setValuation(e.target.value)}
                        />
                        <TextField name="revenue" label="Revenue and Profit/loss history" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
                        <TextField
                            name="financialProjections"
                            label="Financial projections"
                            value={financialProjections}
                            onChange={(e) => setFinancialProjections(e.target.value)}
                        />
                        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                            Deal Structure:
                        </Typography>
                        <TextField
                            name="typeOfInvestment"
                            required
                            label="Type of investment"
                            error={errInvestmentType}
                            value={investmentType}
                            onChange={(e) => setInvestmentType(e.target.value)}
                            placeholder="equity, debt, convertible note, etc."
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Separate by comma
                        </Typography>
                        <TextField
                            name="deelio"
                            required
                            multiline
                            rows={4}
                            error={errInvestmentTerms}
                            value={investmentTerms}
                            onChange={(e) => setInvestmentTerms(e.target.value)}
                            label="Deelio"
                        />
                        <TextField
                            name="ownershipPercentageOffered"
                            required
                            type="number"
                            error={errOwnershipPercentageOffered}
                            value={ownershipPercentageOffered}
                            onChange={(e) => setOwnershipPercentageOffered(e.target.value)}
                            label="Equity ownership percentage offered"
                            placeholder="30"
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            e.g., 30 means 30 percentage
                        </Typography>
                        <TextField name="useOfFunds" label="Use of Funds" placeholder="" value={useOfFunds} onChange={(e) => setUseOfFunds(e.target.value)} />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Details on how the funds raised will be used to grow the business.
                        </Typography>
                        <TextField
                            name="transactionAndMiletones"
                            label="Transaction and Miletones"
                            value={transactionAndMiletones}
                            onChange={(e) => setTransactionAndMiletones(e.target.value)}
                            placeholder=""
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Information about the company's achievements, milestones reached, and future goals.
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                            Legal and Compliance:
                        </Typography>
                        <TextField
                            name="termsAndConditions"
                            required
                            label="Terms and Conditions"
                            multiline
                            rows={4}
                            error={errTermsAndConditions}
                            value={termsAndConditions}
                            onChange={(e) => setTermsAndConditions(e.target.value)}
                        />
                        <TextField
                            name="securitiesFilings"
                            required
                            label="Securities Filings"
                            multiline
                            rows={4}
                            error={errSecuritiesFilings}
                            value={securitiesFilings}
                            onChange={(e) => setSecuritiesFilings(e.target.value)}
                        />
                        <TextField
                            name="regulatoryComplianceDetails"
                            required
                            label="Regulatory compliance details"
                            multiline
                            rows={4}
                            error={errRegulatoryComplianceDetails}
                            value={regulatoryComplianceDetailss}
                            onChange={(e) => setRegulatoryComplianceDetails(e.target.value)}
                        />
                        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                            Attachments:
                        </Typography>
                        <MuiFileInput
                            name="attachmentPDF"
                            label="Attachment PDFs"
                            value={attachmentUrl}
                            required
                            error={errAttachmentUrl}
                            variant="outlined"
                            multiple
                            onChange={setAttachmentUrl}
                            sx={{ mt: 2 }}
                            InputProps={{
                                color: 'primary',
                                inputProps: {
                                    accept: 'application/pdf',
                                },
                                startAdornment: <Iconify icon="eva:attach-fill" />,
                            }}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Please choose documents for your deal(format: PDF)
                        </Typography>
                        <TextField
                            name="risksAnddisclaimers"
                            required
                            label="Risks and Disclaimers"
                            multiline
                            rows={4}
                            placeholder=""
                            error={errRisksAndDisclaimers}
                            value={risksAndDisclaimers}
                            onChange={(e) => setRisksAndDisclaimerss(e.target.value)}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Disclosure of potential risks associated with the investment.
                        </Typography>
                        <TextField
                            name="dueDiligenceMaterials"
                            required
                            multiline
                            rows={4}
                            label="Due Diligence materials"
                            error={errDueDiligenceMaterials}
                            value={dueDiligenceMaterials}
                            onChange={(e) => setDueDiligenceMaterials(e.target.value)}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Access to additional documents, such as financial reports, legal agreements, and more.
                        </Typography>
                        <TextField
                            name="investorEligibility"
                            required
                            label="Investor Eligibility"
                            placeholder="Yes or No"
                            error={errInvestorEligibilitys}
                            value={investorEligibilitys}
                            onChange={(e) => setInvestorEligibilitys(e.target.value)}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Yes: for accredited investors, No: for non-accredited investors.
                        </Typography>
                        <TextField
                            name="minInvestmentAmount"
                            required
                            label="Minimum Investment Amounts"
                            placeholder="10000"
                            error={errMinInvestmentAmount}
                            value={minInvestmentAmount ? `$ ${minInvestmentAmount}` : ''}
                            onChange={(e) => handleInvestmentAmount(e, 'min')}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            The minimum amounts that investors can contribute to the deal.
                        </Typography>
                        <TextField
                            name="maxInvestmentAmount"
                            required
                            label="Maximum Investment Amounts"
                            placeholder="$10000"
                            error={errMaxInvestmentAmount}
                            value={maxInvestmentAmount ? `$ ${maxInvestmentAmount}` : ''}
                            onChange={(e) => handleInvestmentAmount(e, 'max')}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            The maximum amounts that investors can contribute to the deal.
                        </Typography>
                        <TextField
                            name="datesOrDealDuration"
                            required
                            label="Dates / Deal Duration"
                            placeholder="3-6 months"
                            error={errDealDuration}
                            value={dealsDuration}
                            onChange={(e) => setDealDuration(e.target.value)}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            The timeframe during which the deal is open for investment.
                        </Typography>
                        <MuiFileInput
                            name="pastProjects"
                            label="Past Projects"
                            value={pastProjects}
                            variant="outlined"
                            multiple
                            onChange={setPastProjects}
                            InputProps={{
                                color: 'primary',
                                inputProps: {
                                    accept: 'image/*',
                                },
                                startAdornment: <Iconify icon="eva:attach-fill" />,
                            }}
                        />
                        <Typography variant="caption" color={theme.palette.grey[500]} style={{ marginTop: 2 }}>
                            Please choose images for your past projects(format: image/*)
                        </Typography>
                        <LoadingButton sx={{ mt: 2 }} onClick={onSubmit}>
                            Submit
                        </LoadingButton>
                    </Stack>
                </Box>
            </Modal>

            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Remove Deal</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Are you sure you want to remove this deal?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal}>Cancle</Button>
                    <Button onClick={handleCloseDeleteModal} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
