-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2024 at 09:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sbo`
--

-- --------------------------------------------------------

--
-- Table structure for table `authentication`
--

CREATE TABLE `authentication` (
  `id_auth` int(11) NOT NULL,
  `nip` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `confirmasi_password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hasil_survey_leadbo`
--

CREATE TABLE `hasil_survey_leadbo` (
  `id_hasil_leadbo` int(11) NOT NULL,
  `id_pertanyaan` int(11) DEFAULT NULL,
  `x` varchar(255) DEFAULT NULL,
  `y` varchar(255) DEFAULT NULL,
  `tahun` int(11) DEFAULT NULL,
  `triwulan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hasil_survey_pebo`
--

CREATE TABLE `hasil_survey_pebo` (
  `id_hasil_pebo` int(11) NOT NULL,
  `id_pertanyaan` int(11) DEFAULT NULL,
  `x` varchar(255) DEFAULT NULL,
  `y` varchar(255) DEFAULT NULL,
  `tahun` int(11) DEFAULT NULL,
  `triwulan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hasil_survey_priker`
--

CREATE TABLE `hasil_survey_priker` (
  `id_hasil_priker` int(11) NOT NULL,
  `id_pertanyaan` int(11) DEFAULT NULL,
  `x` varchar(255) DEFAULT NULL,
  `y` varchar(255) DEFAULT NULL,
  `tahun` int(11) DEFAULT NULL,
  `triwulan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hasil_survey_sysbo`
--

CREATE TABLE `hasil_survey_sysbo` (
  `id_hasil_sysbo` int(11) NOT NULL,
  `id_pertanyaan` int(11) DEFAULT NULL,
  `x` varchar(255) DEFAULT NULL,
  `y` varchar(255) DEFAULT NULL,
  `tahun` int(11) DEFAULT NULL,
  `triwulan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `indikator_leadership`
--

CREATE TABLE `indikator_leadership` (
  `id` int(11) NOT NULL,
  `no` int(11) DEFAULT NULL,
  `indikator` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `indikator_people`
--

CREATE TABLE `indikator_people` (
  `id` int(11) NOT NULL,
  `no` int(11) DEFAULT NULL,
  `indikator` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `indikator_perilaku`
--

CREATE TABLE `indikator_perilaku` (
  `id` int(11) NOT NULL,
  `no` int(11) DEFAULT NULL,
  `indikator` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `indikator_system`
--

CREATE TABLE `indikator_system` (
  `id` int(11) NOT NULL,
  `no` int(11) DEFAULT NULL,
  `indikator` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `konsep_dasar_hukum`
--

CREATE TABLE `konsep_dasar_hukum` (
  `id` int(11) NOT NULL,
  `no` int(11) DEFAULT NULL,
  `dasar_hukum` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `list_model`
--

CREATE TABLE `list_model` (
  `id` int(11) NOT NULL,
  `variabel_leadership` varchar(255) DEFAULT NULL,
  `variabel_people` varchar(255) DEFAULT NULL,
  `variabel_system` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `list_nilai_inti`
--

CREATE TABLE `list_nilai_inti` (
  `id` int(11) NOT NULL,
  `berorientasi_pelayanan` varchar(255) DEFAULT NULL,
  `akuntabel` varchar(255) DEFAULT NULL,
  `kompeten` varchar(255) DEFAULT NULL,
  `harmonis` varchar(255) DEFAULT NULL,
  `loyal` varchar(255) DEFAULT NULL,
  `adaptif` varchar(255) DEFAULT NULL,
  `kolaboratif` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nilai_konversi_survey`
--

CREATE TABLE `nilai_konversi_survey` (
  `id` int(11) NOT NULL,
  `nama_kandidat` varchar(255) NOT NULL,
  `nilai_konversi` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nilai_konversi_survey`
--

INSERT INTO `nilai_konversi_survey` (`id`, `nama_kandidat`, `nilai_konversi`) VALUES
(1, 'Isna', 3.3333),
(2, 'Kandidat 1', 3.67855),
(3, 'Kandidat 2', 3.619),
(4, 'Kandidat 3', 3.5238),
(5, 'Novi', 3.3333),
(6, 'Syihan', 3.34917);

-- --------------------------------------------------------

--
-- Table structure for table `nilai_tambah`
--

CREATE TABLE `nilai_tambah` (
  `id` int(5) NOT NULL,
  `nama_kandidat` varchar(50) NOT NULL,
  `nilai_kip_app` float NOT NULL,
  `nilai_presensi` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nilai_tambah`
--

INSERT INTO `nilai_tambah` (`id`, `nama_kandidat`, `nilai_kip_app`, `nilai_presensi`) VALUES
(16, 'Kandidat 2', 3.1, 3.93),
(17, 'Kandidat 3', 3.1, 3.93),
(18, 'Kandidat 2', 3.1, 3.93),
(19, 'Kandidat 2', 3.1, 3.93);

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE `pegawai` (
  `nip` varchar(255) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `stat_jabatan` varchar(255) DEFAULT NULL,
  `golongan_akhir` varchar(255) DEFAULT NULL,
  `tmt_golongan` datetime DEFAULT NULL,
  `pendidikan` varchar(255) DEFAULT NULL,
  `tanggal_lulus` datetime DEFAULT NULL,
  `jenis_kelamin` varchar(255) DEFAULT NULL,
  `tanggal_lahir` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pertanyaan_leadership`
--

CREATE TABLE `pertanyaan_leadership` (
  `id_pertanyaan` int(10) NOT NULL,
  `nomor` int(11) DEFAULT NULL,
  `pertanyaan_leadership` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pertanyaan_leadership`
--

INSERT INTO `pertanyaan_leadership` (`id_pertanyaan`, `nomor`, `pertanyaan_leadership`, `label`) VALUES
(1, 1, 'Pegawai menerima masukan secara rutin dari pimpinan mengenai implementasi nilai BerAKHLAK dalam pelaksanaan tugas sehari-hari.', 'LeadBO-1'),
(2, 2, 'Pimpinan memberikan contoh yang baik dalam implementasi nilai-nilai BerAKHLAK.', 'LeadBO-2'),
(3, 3, 'Pimpinan memberikan pujian ketika salah seorang bawahan memberikan pelayanan terbaik kepada stakeholder (internal dan eksternal) sesuai dengan nilai BerAKHLAK.', 'LeadBO-3'),
(4, 4, 'Pimpinan melakukan program coaching yang efektif untuk membantu pegawai mengembangkan kompetensi mereka. (Note: Coaching adalah teknik atau proses yang dilakukan untuk membuka potensi seseorang dalam rangka mengoptimalkan kinerja dan pengembangan dirinya ', 'LeadBO-4'),
(5, 5, 'Pimpinan bukan hanya berbicara, tetapi mengambil tindakan yang nyata untuk meningkatkan nilai BerAKHLAK sebagai budaya organisasi.', 'LeadBO-5'),
(6, 6, 'Pimpinan menekankan secara berulang-ulang tentang pentingnya BerAKHLAK diimplementasikan dalam pekerjaan sehari-hari.', 'LeadBO-6'),
(7, 7, 'Pimpinan melaksanakan program mentoring yang efektif untuk membantu pegawai mengembangkan kompetensi. (note: Mentoring adalah proses membimbing/melatih yang dilakukan oleh orang yang ahli di bidang tertentu terhadap pegawai yang membutuhkan peningkatan ko', 'LeadBO-7'),
(8, 8, 'Pimpinan mendorong semua anak buahnya untuk selalu memberikan layanan yang terbaik.', 'LeadBO-8');

-- --------------------------------------------------------

--
-- Table structure for table `pertanyaan_people`
--

CREATE TABLE `pertanyaan_people` (
  `id_pertanyaan` int(30) NOT NULL,
  `nomor` int(11) DEFAULT NULL,
  `pertanyaan_people` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pertanyaan_people`
--

INSERT INTO `pertanyaan_people` (`id_pertanyaan`, `nomor`, `pertanyaan_people`, `label`) VALUES
(1, 1, 'Pegawai memahami dan memenuhi kebutuhan masyarakat.', 'PeBO-1'),
(2, 2, 'Pegawai ramah, cekatan, solutif dan dapat diandalkan.', 'PeBO-2'),
(3, 3, 'Pegawai melakukan perbaikan tiada henti.', 'PeBO-3'),
(4, 4, 'Pegawai melaksanakan tugas dengan jujur, bertanggungjawab, cermat, disiplin dan berintegritas tinggi.', 'PeBO-4'),
(5, 5, 'Pegawai menggunakan kekayaan dan barang milik negara secara bertanggung jawab, efektif, dan efisien.', 'PeBO-5'),
(6, 6, 'Pegawai tidak menyalahgunakan kekuasaan.', 'PeBO-6'),
(7, 7, 'Pegawai meningkatkan kompetensi diri untuk menjawab tantangan yang selalu berubah.', 'PeBO-7'),
(8, 8, 'Pegawai membantu orang lain belajar.', 'PeBO-8'),
(9, 9, 'Pegawai melaksanakan tugas dengan kualitas terbaik.', 'PeBO-9'),
(10, 10, 'Pegawai menghargai setiap orang apapun latar belakangnya.', 'PeBO-10'),
(11, 11, 'Pegawai suka menolong orang lain.', 'PeBO-11'),
(12, 12, 'Pegawai membangun lingkungan kerja yang kondusif.', 'PeBO-12'),
(13, 13, 'Pegawai memegang teguh ideologi Pancasila,Undang-Undang Dasar Negara Republik Indonesia tahun 1945, setia kepada Negara Kesatuan Republik Indonesia serta pemerintahan yang sah.', 'PeBO-13'),
(14, 14, 'Pegawai menjaga nama baik sesama ASN, pimpinan, instansi, dan negara.', 'PeBO-14'),
(15, 15, 'Pegawai menjaga rahasia jabatan dan negara.', 'PeBO-15'),
(16, 16, 'Pegawai cepat menyesuaikan diri menghadapi perubahan.', 'PeBO-16'),
(17, 17, 'Pegawai terus berinovasi dan mengembangkan kreativitas.', 'PeBO-17'),
(18, 18, 'Pegawai bertindak proaktif.', 'PeBO-18'),
(19, 19, 'Pegawai memberi kesempatan kepada berbagai pihak untuk berkontribusi.', 'PeBO-19'),
(20, 20, 'Pegawai terbuka dalam bekerja sama untuk menghasilkan nilai tambah.', 'PeBO-20'),
(21, 21, 'Pegawai menggerakkan pemanfaatan berbagai sumberdaya untuk tujuan bersama.', 'PeBO-21');

-- --------------------------------------------------------

--
-- Table structure for table `pertanyaan_perilaku`
--

CREATE TABLE `pertanyaan_perilaku` (
  `id_pertanyaan` int(10) NOT NULL,
  `nomor` int(11) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `pertanyaan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pertanyaan_perilaku`
--

INSERT INTO `pertanyaan_perilaku` (`id_pertanyaan`, `nomor`, `label`, `pertanyaan`) VALUES
(1, 1, 'priker-1', 'Berorientasi pelayanan, yaitu memahami dan memenuhi kebutuhan masyarakat, ramah, cekatan, solutif, dapat diandalkan, dan melakukan perbaikan tiada henti.\r\n\r\n'),
(2, 2, 'priker-2', 'Akuntabel, yaitu melaksanakan tugas dengan jujur, bertanggungjawab, cermat, disiplin berintegritas tinggi, menggunakan kekayaan dan barang milik negara secara bertanggungjawab, efektif, efisien, dan tidak menyalahgunakan kewenangan jabatan.\r\n\r\n'),
(3, 3, 'priker-3', 'Kompeten, yaitu meningkatkan kompetensi diri untuk menjawab tantangan yang selalu berubah, membantu orang lain belajar, dan melaksanakan tugas dengan kualitas terbaik.\r\n\r\n'),
(4, 4, 'priker-4', 'Harmonis,, yaitu menghargai setiap orang apapun latar belakangnya, suka menolong orang lain, dan membangun lingkungan kerja yang kondusif.'),
(5, 5, 'priker-5', 'Loyal, yaitu memegang teguh ideologi Pancasila, Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, setia kepada Negara Kesatuan Republik Indonesia serta pemerintahan yang sah, menjaga nama baik sesama ASN, Pimpinan, Instansi, dan Negara, dan menjag'),
(6, 6, 'priker-6', 'Adaptif, yaitu cepat menyesuaikan diri menghadapi perubahan, terus berinovasi dan mengembangkan kreativitas, dan bertindak proaktif.'),
(7, 7, 'priker-7', 'Kolaboratif, yaitu memberi kesempatan kepada berbagai pihak untuk berkontribusi, terbuka dalam bekerja sama untuk menghasilkan nilai tambah, dan menggerakkan pemanfaatan berbagai sumberdaya untuk tujuan bersama.');

-- --------------------------------------------------------

--
-- Table structure for table `pertanyaan_system`
--

CREATE TABLE `pertanyaan_system` (
  `id_pertanyaan` int(30) NOT NULL,
  `nomor` int(11) DEFAULT NULL,
  `pertanyaan_system` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pertanyaan_system`
--

INSERT INTO `pertanyaan_system` (`id_pertanyaan`, `nomor`, `pertanyaan_system`, `label`) VALUES
(1, 1, 'BPS Kabupaten Tasikmalaya memberikan sanksi terhadap pegawai yang melakukan tindakan yang tidak sesuai dengan BerAKHLAK', 'SysBO-1'),
(2, 2, 'BPS Kabupaten Tasikmalaya memiliki standar yang jelas dalam mengimplementasikan BerAKHLAK', 'SysBO-2'),
(3, 3, 'BPS Kabupaten Tasikmalaya memberikan penghargaan kepada pegawai yang menunjukkan nilai BerAKHLAK yang sangat baik', 'SysBO-3'),
(4, 4, 'BPS Kabupaten Tasikmalaya telah memiliki media (email, telepon, sms, whatsapp, dll) untuk menampung keluhan dari stakeholder (eksternal dan internal)', 'SysBO-4'),
(5, 5, 'BPS Kabupaten Tasikmalaya telah memiliki sarana bagi pegawainya untuk dapat secara aktif menyuarakan pendapat mereka dalam upaya untuk meningkatkan nilai BerAKHLAK menjadi budaya organisasi', 'SysBO-5'),
(6, 6, 'BPS Kabupaten Tasikmalaya memiliki sejumlah inisiatif atau program untuk meningkatkan BerAKHLAK menjadi budaya organisasi', 'SysBO-6'),
(7, 7, 'BPS Kabupaten Tasikmalaya telah melaksanakan/ mengimplementasikan inisiatif atau program untuk meningkatkan BerAKHLAK menjadi budaya dalam pekerjaan sehari-hari', 'SysBO-7'),
(8, 8, 'Pegawai yang menunjukkan kualitas pelayanan yang luar biasa diberi prioritas kesempatan untuk meningkatkan kompetensinya', 'SysBO-8'),
(9, 9, 'Terdapat jalur/media komunikasi untuk mensosialisasikan BerAKHLAK dan budaya pelayanan kepada semua pegawai BPS secara rutin (misalnya melalui Community, Varia Statistik, email, whatsapp group, dll)', 'SysBO-9'),
(10, 10, 'Inisiatif atau program peningkatan nilai BerAKHLAK dilakukan dengan mendengarkan saran/masukan dari stakeholder (internal dan eksternal)', 'SysBO-10'),
(11, 11, 'Penghargaan yang berkaitan dengan implementasi nilai BerAKHLAK dalam meningkatkan kualitas pelayanan diberikan secara adil dan transparan', 'SysBO-11');

-- --------------------------------------------------------

--
-- Table structure for table `survey_budaya_organisasi`
--

CREATE TABLE `survey_budaya_organisasi` (
  `id_survey_b` int(10) NOT NULL,
  `label` varchar(255) NOT NULL,
  `triwulan` int(11) NOT NULL,
  `tahun` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `umur` int(10) NOT NULL,
  `pendidikan` varchar(20) NOT NULL,
  `masa_kerja` varchar(50) NOT NULL,
  `score_harapan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`score_harapan`)),
  `score_kinerja` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`score_kinerja`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `survey_budaya_organisasi`
--

INSERT INTO `survey_budaya_organisasi` (`id_survey_b`, `label`, `triwulan`, `tahun`, `nama`, `jenis_kelamin`, `umur`, `pendidikan`, `masa_kerja`, `score_harapan`, `score_kinerja`) VALUES
(2, 'PriKer', 1, 2024, 'Dorajatun ', 'Laki-laki', 50, 'SLTA', '20 tahun', '[4,3,4,4,4,4,4]', '[4,4,4,4,4,4,4]'),
(3, 'LeadBO', 1, 2924, 'Dorajatun ', 'Laki-laki', 50, 'SLTA', '20 tahun', '[4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4]'),
(4, 'PeBO', 1, 2024, 'Dorajatun ', 'Laki-laki', 50, 'SLTA', '20 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]'),
(5, 'SysBO', 1, 2024, 'Dorajatun ', 'Laki-laki', 50, 'SLTA', '20 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,3,4,3,4,4,4,3]'),
(6, 'PriKer-1721617462842', 1, 2024, 'Arianto', 'Laki-laki', 55, 'S2', '20 tahun', '[4,4,4,4,4,4,4]', '[3,3,3,3,4,3,3]'),
(7, 'LeadBO-1721617611646', 1, 2024, 'Arianto', 'Laki-laki', 55, 'S2', '20 tahun', '[4,4,4,4,4,4,4,4]', '[3,4,4,3,4,4,3,4]'),
(8, 'PeBO-1721617861714', 1, 2024, 'Arianto', 'Laki-laki', 55, 'S2', '20 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[2,3,3,3,3,3,3,3,3,3,3,3,4,4,4,3,3,3,3,3,3]'),
(9, 'SysBO-1721618075749', 1, 2024, 'Arianto', 'Laki-laki', 55, 'S2', '20 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[3,3,4,3,3,3,3,3,3,3,3]'),
(10, 'PriKer-1721618750444', 1, 2024, 'Dindin', 'Laki-laki', 55, 'S2', '20 tahun', '[4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4]'),
(11, 'LeadBO-1721618789576', 1, 2024, 'Dindin', 'Laki-laki', 55, 'S2', '20 tahun', '[4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4]'),
(12, 'PeBO-1721618890664', 1, 2024, 'Dindin', 'Laki-laki', 55, 'S2', '20 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[4,4,3,4,4,4,3,4,4,4,4,4,4,4,4,4,3,3,4,4,3]'),
(13, 'SysBO-1721618949426', 1, 2024, 'Dindin', 'Laki-laki', 55, 'S2', '20 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[4,3,4,4,3,4,4,4,3,4,4]'),
(14, 'PriKer-1721620737318', 1, 2024, 'Diyah ', 'Perempuan', 40, 'S2', '16-20 tahun', '[4,4,4,4,4,4,4]', '[3,3,3,4,3,4,3]'),
(15, 'LeadBO-1721620810528', 1, 2024, 'Diyah ', 'Perempuan', 40, 'S2', '16-20 tahun', '[4,4,4,4,4,4,4,4]', '[3,3,4,3,3,4,3,4]'),
(16, 'PeBO-1721620946911', 1, 2024, 'Diyah ', 'Perempuan', 40, 'S2', '16-20 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,3,3,3,4,4,3,3,3,4,4,3,4,3,4,3,3,3,3,3,3]'),
(17, 'SysBO-1721621016736', 1, 2024, 'Diyah ', 'Perempuan', 40, 'S2', '16-20 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[3,3,3,4,3,3,3,3,3,3,3]'),
(18, 'PriKer-1721621587777', 1, 2024, 'Deden ', 'Laki-laki', 43, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4]'),
(19, 'LeadBO-1721621666067', 1, 2024, 'Deden ', 'Laki-laki', 43, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4]'),
(20, 'PeBO-1721621820800', 1, 2024, 'Deden ', 'Laki-laki', 43, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]'),
(21, 'SysBO-1721621913853', 1, 2024, 'Deden ', 'Laki-laki', 43, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4]'),
(22, 'PriKer-1721623342545', 1, 2024, 'Asep', 'Laki-laki', 47, 'D4', '20 tahun keatas', '[4,4,4,4,4,4,4]', '[3,3,3,3,3,3,3]'),
(23, 'LeadBO-1721623398307', 1, 2024, 'Asep ', 'Laki-laki', 47, 'D4', '20 tahun keatas', '[4,4,4,4,4,4,4,4]', '[3,3,3,3,3,3,3,3]'),
(24, 'PeBO-1721623521110', 1, 2024, 'Asep ', 'Laki-laki', 47, 'D4', '20 tahun keatas', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]'),
(26, 'SysBO-1721623643028', 1, 2024, 'Asep ', 'Laki-laki', 47, 'D4', '20 tahun keatas', '[4,4,4,4,4,4,4,4,4,4,4]', '[3,3,3,3,3,3,3,3,3,3,3]'),
(27, 'PriKer-1721632354528', 1, 2024, 'Elis', 'Perempuan', 53, 'S1', '20 tahun keatas', '[4,4,4,4,4,4,4]', '[3,2,4,3,4,3,3]'),
(28, 'LeadBO-1721632412568', 1, 2024, 'Elis', 'Perempuan', 53, 'S1', '20 tahun keatas', '[4,4,4,4,4,4,4,4]', '[4,4,3,4,4,4,4,4]'),
(29, 'PeBO-1721632491787', 1, 2024, 'Elis', 'Perempuan', 53, 'S1', '20 tahun keatas', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,4,3,3,3,2,3,4,3,3,4,4,4,3,4,3,3,3,3,3,3]'),
(30, 'SysBO-1721632600199', 1, 2024, 'Elis', 'Perempuan', 53, 'S1', '20 tahun keatas', '[4,4,4,3,4,4,4,4,4,4,4]', '[3,3,3,3,3,3,3,3,3,3,3]'),
(31, 'PriKer-1721632781504', 1, 2024, 'Deni ', 'Laki-laki', 50, 'D4', '20 tahun keatas', '[4,4,4,4,4,4,4]', '[3,4,3,3,3,3,3]'),
(32, 'LeadBO-1721632844489', 1, 2024, 'Deni ', 'Laki-laki', 50, 'D4', '20 tahun keatas', '[4,4,4,4,4,4,4,4]', '[3,4,4,3,4,4,4,4]'),
(33, 'PeBO-1721632968614', 1, 2024, 'Deni ', 'Laki-laki', 50, 'D4', '20 tahun keatas', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,3,3,3,3,3,2,2,3,3,2,3,3,3,3,2,2,2,3,2,3]'),
(34, 'SysBO-1721633122306', 1, 2024, 'Deni ', 'Laki-laki', 50, 'D4', '20 tahun keatas', '[4,4,4,4,4,4,4,4,4,4,4]', '[3,3,3,3,3,3,3,3,3,3,2]'),
(35, 'PriKer-1721633322665', 1, 2024, 'Dudi ', 'Laki-laki', 41, 'S2', '16-20 tahun', '[3,3,3,4,3,4,3]', '[3,3,3,3,3,2,3]'),
(36, 'LeadBO-1721633494417', 1, 2024, 'Dudi ', 'Laki-laki', 41, 'S2', '16-20 tahun', '[3,3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3]'),
(37, 'PeBO-1721633623688', 1, 2024, 'Dudi ', 'Laki-laki', 41, 'S2', '16-20 tahun', '[3,3,3,2,2,4,3,3,2,4,3,4,2,4,3,4,3,2,3,3,3]', '[3,3,2,2,2,3,2,3,2,4,2,2,2,4,3,2,3,2,3,3,3]'),
(38, 'SysBO-1721633836435', 1, 2024, 'Dudi ', 'Laki-laki', 41, 'S2', '16-20 tahun', '[3,3,3,3,4,3,3,3,3,2,3]', '[2,2,3,3,2,2,2,3,1,2,3]'),
(39, 'PriKer-1721634270779', 1, 2024, 'Achmad', 'Laki-laki', 41, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4]'),
(40, 'LeadBO-1721634339115', 1, 2024, 'Achmad ', 'Laki-laki', 41, 'S1', '10-15 tahun', '[4,4,3,4,4,4,4,4]', '[4,4,4,4,4,4,4,4]'),
(41, 'PeBO-1721634444522', 1, 2024, 'Achmad ', 'Laki-laki', 41, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]'),
(42, 'SysBO-1721634514317', 1, 2024, 'Achmad ', 'Laki-laki', 41, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4]'),
(43, 'PriKer-1721634590840', 1, 2024, 'Erlina', 'Perempuan', 36, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4]', '[3,3,3,3,4,3,4]'),
(44, 'LeadBO-1721634663947', 1, 2024, 'Erlina', 'Perempuan', 36, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4,4]', '[3,4,4,3,4,4,3,4]'),
(45, 'PeBO-1721634747106', 1, 2024, 'Erlina', 'Perempuan', 36, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,4,3,3,3,4,3,3,3,4,4,3,4,3,4,3,3,3,4,4,4]'),
(46, 'SysBO-1721634960024', 1, 2024, 'Erlina', 'Perempuan', 36, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[3,3,3,4,4,3,3,3,3,3,3]'),
(47, 'PriKer-1721636663631', 1, 2024, 'Gilang', 'Laki-laki', 38, 'S2', '16-20 tahun', '[3,4,4,4,4,3,4]', '[4,4,3,4,4,4,4]'),
(48, 'LeadBO-1721636745273', 1, 2024, 'Gilang', 'Laki-laki', 38, 'S2', '16-20 tahun', '[3,4,4,4,4,4,4,4]', '[3,3,2,2,3,3,3,3]'),
(49, 'PeBO-1721637230443', 1, 2024, 'Gilang', 'Laki-laki', 38, 'S2', '16-20 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3]', '[3,3,3,3,3,4,3,3,3,4,4,4,4,4,4,3,4,4,3,4,3]'),
(50, 'SysBO-1721637356226', 1, 2024, 'Gilang', 'Laki-laki', 38, 'S2', '16-20 tahun', '[4,4,4,3,4,4,4,4,4,4,4]', '[2,3,4,2,2,3,2,3,4,3,3]'),
(51, 'PriKer-1721700657513', 1, 2024, 'Ade', 'Laki-laki', 41, 'S1', '10-15 tahun', '[4,4,3,3,3,3,3]', '[3,4,3,3,3,3,3]'),
(52, 'LeadBO-1721700747872', 1, 2024, 'Ade', 'Laki-laki', 41, 'S1', '10-15 tahun', '[3,3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3]'),
(53, 'PeBO-1721700834000', 1, 2024, 'Ade', 'Laki-laki', 41, 'S1', '10-15 tahun', '[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]'),
(55, 'SysBO-1721701510581', 1, 2024, 'Ade', 'Laki-laki', 41, 'S1', '10-15 tahun', '[3,3,3,3,3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3,3,3,3]'),
(56, 'PriKer-1721701624121', 1, 2024, 'Ida', 'Perempuan', 37, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4]', '[3,3,3,4,3,2,3]'),
(57, 'LeadBO-1721701709043', 1, 2024, 'Ida', 'Perempuan', 37, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4,4]', '[3,4,4,3,3,3,3,4]'),
(58, 'PeBO-1721701895492', 1, 2024, 'Ida', 'Perempuan', 37, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[2,3,2,3,3,3,3,3,3,3,4,3,3,3,2,2,3,3,3,3,3]'),
(59, 'SysBO-1721702062197', 1, 2024, 'Ida', 'Perempuan', 37, 'D3', '10-15 tahun', '[3,4,4,4,4,4,4,4,4,4,4]', '[2,3,2,3,2,3,3,2,3,3,2]'),
(60, 'PriKer-1721702204024', 1, 2024, 'Andri', 'Laki-laki', 39, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4]', '[4,4,4,4,4,4,3]'),
(61, 'LeadBO-1721702257389', 1, 2024, 'Andri', 'Laki-laki', 39, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4]', '[3,4,4,4,4,4,4,4]'),
(62, 'PeBO-1721702327003', 1, 2024, 'Andri', 'Laki-laki', 39, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,3,3,4,3,3,3,3,3,4,3,3,3,4,3,4,3,3,3,3,3]'),
(63, 'SysBO-1721702387530', 1, 2024, 'Andri', 'Laki-laki', 39, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[3,4,3,3,3,4,3,3,4,3,3]'),
(64, 'PriKer-1721705123699', 1, 2024, 'Ika ', 'Perempuan', 40, 'S2', '16-20 tahun', '[4,4,4,4,4,4,4]', '[3,3,3,3,3,3,4]'),
(65, 'LeadBO-1721705210635', 1, 2024, 'Ika ', 'Perempuan', 40, 'S2', '16-20 tahun', '[4,4,4,4,4,4,4,4]', '[3,4,4,4,4,3,3,4]'),
(66, 'PeBO-1721705324828', 1, 2024, 'Ika ', 'Perempuan', 40, 'S2', '16-20 tahun', '[4,4,4,4,4,4,4,3,4,4,4,4,3,4,4,3,3,4,3,3,3]', '[3,3,3,3,3,3,2,3,3,4,4,3,3,3,4,2,3,3,3,3,3]'),
(67, 'SysBO-1721705442364', 1, 2024, 'Ika ', 'Perempuan', 40, 'S2', '16-20 tahun', '[4,3,3,4,3,3,4,3,3,3,4]', '[3,2,3,3,3,3,3,3,2,2,3]'),
(68, 'PriKer-1721705750263', 1, 2024, 'Dede ', 'Laki-laki', 54, 'SLTA', '20 tahun keatas', '[3,3,4,3,3,4,3]', '[3,3,3,4,3,3,4]'),
(69, 'LeadBO-1721705886034', 1, 2024, 'Dede ', 'Laki-laki', 54, 'SLTA', '20 tahun keatas', '[3,4,3,3,4,4,3,3]', '[3,3,4,4,3,4,3,4]'),
(70, 'PeBO-1721706013969', 1, 2024, 'Dede ', 'Laki-laki', 54, 'SLTA', '20 tahun keatas', '[3,4,4,3,4,3,4,3,4,4,3,4,3,4,3,4,3,4,4,3,4]', '[4,3,4,3,4,3,4,4,3,4,3,3,3,4,3,4,3,4,4,3,3]'),
(71, 'SysBO-1721706105565', 1, 2024, 'Dede ', 'Laki-laki', 54, 'SLTA', '20 tahun keatas', '[3,4,3,4,4,3,4,3,3,4,3]', '[4,4,3,4,3,3,3,3,3,4,3]'),
(72, 'PriKer-1721706496012', 1, 2024, 'Suhartono', 'Laki-laki', 54, 'S2', '20 tahun keatas', '[4,4,4,4,4,4,4]', '[3,3,4,4,4,3,4]'),
(73, 'LeadBO-1721706547619', 1, 2024, 'Suhartono', 'Laki-laki', 56, 'S2', '20 tahun keatas', '[4,4,4,4,4,4,4,4]', '[3,3,4,4,4,4,3,4]'),
(74, 'PeBO-1721706645972', 1, 2024, 'Suhartono', 'Laki-laki', 56, 'S2', '20 tahun keatas', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,3,4,3,3,3,3,4,3,4,4,3,4,3,4,3,3,3,4,3,3]'),
(75, 'SysBO-1721706706505', 1, 2024, 'Suhartono', 'Laki-laki', 56, 'S2', '20 tahun keatas', '[4,4,4,4,4,4,4,4,4,4,4]', '[3,3,4,4,3,3,3,3,3,3,3]'),
(76, 'PriKer-1721706775954', 1, 2024, 'Adenty', 'Perempuan', 37, 'S1', '10-15 tahun', '[3,3,3,4,3,3,3]', '[3,3,3,3,3,3,3]'),
(77, 'LeadBO-1721706850427', 1, 2024, 'Adenty', 'Perempuan', 37, 'S1', '10-15 tahun', '[3,3,3,3,4,3,3,4]', '[3,3,3,3,4,3,3,4]'),
(78, 'PeBO-1721706965807', 1, 2024, 'Adenty', 'Perempuan', 37, 'S1', '10-15 tahun', '[3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,3,3,3,3,4,3]', '[3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,3,3,3,3,4,3]'),
(79, 'SysBO-1721707034663', 1, 2024, 'Adenty', 'Perempuan', 37, 'S1', '10-15 tahun', '[3,3,4,3,3,3,3,3,3,3,3]', '[3,3,4,3,3,3,3,3,3,3,3]'),
(80, 'PriKer-1721709648785', 1, 2024, 'Erwin', 'Laki-laki', 33, 'D3', '10-15 tahun', '[4,4,4,4,3,4,4]', '[4,4,4,4,3,3,4]'),
(81, 'LeadBO-1721709728177', 1, 2024, 'Erwin', 'Laki-laki', 33, 'D3', '10-15 tahun', '[4,4,4,3,3,3,4,4]', '[4,4,4,3,3,3,4,4]'),
(82, 'PeBO-1721709829562', 1, 2024, 'Erwin', 'Laki-laki', 33, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,4]'),
(83, 'SysBO-1721709929090', 1, 2024, 'Erwin', 'Laki-laki', 33, 'D3', '10-15 tahun', '[3,3,4,3,3,4,4,4,3,4,4]', '[3,3,4,3,3,4,4,4,3,4,4]'),
(84, 'PriKer-1721715896046', 1, 2024, 'Gingin', 'Laki-laki', 40, 'D3', '10-15 tahun', '[4,4,3,4,3,4,3]', '[4,4,3,4,3,4,3]'),
(85, 'LeadBO-1721715943958', 1, 2024, 'Gingin', 'Laki-laki', 40, 'D3', '10-15 tahun', '[3,4,4,3,3,4,3,3]', '[4,4,4,3,3,4,3,3]'),
(86, 'PeBO-1721716034610', 1, 2024, 'Gingin', 'Laki-laki', 40, 'D3', '10-15 tahun', '[3,3,3,4,3,4,3,3,4,3,4,3,3,4,4,4,3,3,4,4,4]', '[3,3,3,3,3,4,4,3,3,4,4,4,4,4,4,3,3,4,4,4,4]'),
(87, 'SysBO-1721716083422', 1, 2024, 'Gingin', 'Laki-laki', 37, 'D3', '10-15 tahun', '[3,3,4,4,4,3,3,4,4,3,3]', '[3,3,4,4,4,3,3,4,4,3,3]'),
(88, 'PriKer-1721716694525', 1, 2024, 'Husni', 'Laki-laki', 30, 'D4', '10-15 tahun', '[3,4,4,4,4,3,3]', '[3,4,3,3,4,3,3]'),
(89, 'LeadBO-1721716814377', 1, 2024, 'Husni', 'Laki-laki', 30, 'D4', '10-15 tahun', '[4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4]'),
(90, 'PeBO-1721716927518', 1, 2024, 'Husni', 'Laki-laki', 30, 'D4', '10-15 tahun', '[4,4,4,4,4,4,3,3,4,4,3,4,4,4,4,4,4,4,4,4,3]', '[3,3,4,4,3,3,3,3,4,4,3,3,4,4,4,3,3,3,4,4,3]'),
(91, 'SysBO-1721717011475', 1, 2024, 'Husni', 'Laki-laki', 30, 'D4', '10-15 tahun', '[4,4,4,4,4,4,3,3,4,4,4]', '[3,3,3,3,4,3,3,3,4,4,3]'),
(92, 'PriKer-1721717218309', 1, 2024, 'Irwan', 'Laki-laki', 37, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4]'),
(93, 'LeadBO-1721717256005', 1, 2024, 'Iwran', 'Laki-laki', 37, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4]'),
(94, 'PeBO-1721717315508', 1, 2024, 'Irwan', 'Laki-laki', 37, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]'),
(95, 'SysBO-1721717367010', 1, 2024, 'Irwan', 'Laki-laki', 37, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4]'),
(96, 'PriKer-1721790493113', 1, 2024, 'Dama', 'Laki-laki', 43, 'SLTA', '20 tahun keatas', '[4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4]'),
(97, 'LeadBO-1721790554623', 1, 2024, 'Dama', 'Laki-laki', 43, 'SLTA', '20 tahun keatas', '[4,4,3,4,4,4,4,4]', '[4,4,4,4,4,4,4,4]'),
(98, 'PeBO-1721790587999', 1, 2024, 'Dama', 'Laki-laki', 43, 'SLTA', '20 tahun keatas', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]'),
(99, 'SysBO-1721790636530', 1, 2024, 'Dama', 'Laki-laki', 43, 'SLTA', '20 tahun keatas', '[4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4]'),
(100, 'PriKer-1721790776180', 1, 2024, 'Eka', 'Perempuan', 37, 'S1', '10-15 tahun', '[3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3]'),
(101, 'LeadBO-1721790927952', 1, 2024, 'Eka', 'Perempuan', 37, 'S1', '10-15 tahun', '[3,3,3,4,4,4,4,4]', '[3,3,4,4,4,4,4,4]'),
(102, 'PeBO-1721791080148', 1, 2024, 'Eka', 'Perempuan', 37, 'S1', '10-15 tahun', '[3,3,3,3,3,3,3,3,3,3,4,4,3,3,3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3,3,3,4,4,3,3,3,3,3,3,3,3,3]'),
(103, 'SysBO-1721791171453', 1, 2024, 'Eka', 'Perempuan', 37, 'S1', '10-15 tahun', '[3,3,3,3,3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3,3,3,3]'),
(105, 'PriKer-1721791299294', 1, 2024, 'Erik', 'Laki-laki', 43, 'SLTA', '10-15 tahun', '[4,3,3,4,4,3,4]', '[4,3,3,2,3,3,2]'),
(106, 'LeadBO-1721791457902', 1, 2024, 'Erik', 'Laki-laki', 43, 'SLTA', '10-15 tahun', '[4,4,4,4,4,4,4,4]', '[3,4,4,4,4,3,3,4]'),
(107, 'PeBO-1721791580835', 1, 2024, 'Erik', 'Laki-laki', 43, 'SLTA', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,3,4,3,2,3,4,3,4,2,3,3,4,4,4,4,4,4,2,2,2]'),
(108, 'SysBO-1721791647848', 1, 2024, 'Erik', 'Laki-laki', 43, 'SLTA', '10-15 tahun', '[4,3,3,4,3,4,4,4,4,4,4]', '[3,3,3,3,2,3,2,3,2,3,3]'),
(109, 'PriKer-1721791728301', 1, 2024, 'Gea', 'Perempuan', 29, 'D3', '< 10 tahun', '[4,4,4,4,4,4,4]', '[3,3,4,4,3,4,3]'),
(110, 'LeadBO-1721791790259', 1, 2024, 'Gea', 'Perempuan', 29, 'D3', '< 10 tahun', '[4,4,4,4,4,3,3,4]', '[3,4,4,3,4,3,3,4]'),
(111, 'PeBO-1721791883783', 1, 2024, 'Gea', 'Perempuan', 29, 'D3', '< 10 tahun', '[4,4,3,4,3,4,4,3,3,4,4,4,4,4,4,3,4,4,3,3,3]', '[3,3,2,3,3,3,3,3,2,3,3,3,4,3,3,2,3,3,3,3,3]'),
(112, 'SysBO-1721791976670', 1, 2024, 'Gea', 'Perempuan', 29, 'D3', '< 10 tahun', '[4,4,4,3,3,4,4,3,3,3,4]', '[3,4,4,3,3,4,4,3,3,3,3]'),
(113, 'PriKer-1721792048007', 1, 2024, 'Iis', 'Perempuan', 38, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4]', '[3,4,3,3,4,3,3]'),
(114, 'LeadBO-1721792105670', 1, 2024, 'Iis', 'Perempuan', 38, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4,4]', '[3,3,4,3,3,3,2,3]'),
(115, 'PeBO-1721792186129', 1, 2024, 'Iis', 'Perempuan', 38, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,3,3,2,3,3,3,3,3,3,3,2,3,3,3,3,2,2,2,2,2]'),
(116, 'SysBO-1721792246008', 1, 2024, 'Iis', 'Perempuan', 38, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[3,3,3,3,3,3,2,2,3,2,3]'),
(117, 'PriKer-1721792314866', 1, 2024, 'Iman', 'Laki-laki', 40, 'S1', '10-15 tahun', '[3,3,4,4,4,3,4]', '[3,3,3,4,4,3,4]'),
(118, 'LeadBO-1721792371430', 1, 2024, 'Iman', 'Laki-laki', 40, 'S1', '10-15 tahun', '[3,3,4,4,3,3,3,4]', '[3,3,4,4,3,3,3,4]'),
(119, 'PeBO-1721792455681', 1, 2024, 'Iman', 'Laki-laki', 40, 'S1', '10-15 tahun', '[3,3,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3]', '[3,3,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3]'),
(120, 'SysBO-1721792529228', 1, 2024, 'Iman', 'Laki-laki', 40, 'S1', '10-15 tahun', '[3,3,3,3,3,3,3,3,3,4,4]', '[3,3,3,4,3,3,3,3,3,4,4]'),
(121, 'PriKer-1721792584996', 1, 2024, 'Irma', 'Perempuan', 40, 'SLTA', '16-20 tahun', '[3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3]'),
(122, 'LeadBO-1721792644000', 1, 2024, 'Irma', 'Perempuan', 40, 'SLTA', '16-20 tahun', '[3,3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3]'),
(123, 'PeBO-1721792739416', 1, 2024, 'Irma', 'Perempuan', 40, 'SLTA', '16-20 tahun', '[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]'),
(124, 'SysBO-1721792786586', 1, 2024, 'Irma', 'Perempuan', 40, 'SLTA', '16-20 tahun', '[3,3,3,3,3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3,3,3,3]'),
(125, 'PriKer-1721792914423', 1, 2024, 'Muhammad Sobari', 'Laki-laki', 35, 'S2', '< 10 tahun', '[4,4,4,4,4,4,4]', '[3,3,3,3,3,3,3]'),
(126, 'LeadBO-1721793002711', 1, 2024, 'Muhammad Sobari', 'Laki-laki', 35, 'S2', '< 10 tahun', '[4,4,4,4,4,4,4,4]', '[3,3,3,3,3,3,3,3]'),
(127, 'PeBO-1721793105646', 1, 2024, 'Muhammad Sobari', 'Laki-laki', 35, 'S2', '< 10 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,2,3,3,3,3,2,2,3,3,3,3,3,3,3,3,2,3,3,3,3]'),
(128, 'SysBO-1721793186033', 1, 2024, 'Muhammad Sobari', 'Laki-laki', 35, 'S2', '< 10 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[3,3,4,4,4,3,3,4,4,3,4]'),
(129, 'PriKer-1721793246197', 1, 2024, 'Mulyadin', 'Laki-laki', 45, 'SLTA', '16-20 tahun', '[4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4]'),
(130, 'LeadBO-1721793298861', 1, 2024, 'Mulyadin', 'Laki-laki', 45, 'SLTA', '16-20 tahun', '[4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4]'),
(131, 'PeBO-1721793354443', 1, 2024, 'Mulyadin', 'Laki-laki', 45, 'SLTA', '16-20 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]'),
(132, 'SysBO-1721793402165', 1, 2024, 'Mulyadin', 'Laki-laki', 45, 'SLTA', '16-20 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4]'),
(133, 'PriKer-1721793454475', 1, 2024, 'Nani', 'Perempuan', 51, 'S1', '20 tahun keatas', '[4,4,4,4,4,4,4]', '[3,4,4,3,3,4,3]'),
(134, 'LeadBO-1721793511754', 1, 2024, 'Nani', 'Perempuan', 51, 'S1', '20 tahun keatas', '[4,4,4,4,4,4,4,4]', '[3,3,4,4,3,3,3,4]'),
(135, 'PeBO-1721793615669', 1, 2024, 'Nani', 'Perempuan', 51, 'S1', '16-20 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,3,3,4,3,3,3,4,3,4,4,4,3,3,3,3,3,4,4,4,4]'),
(136, 'SysBO-1721793675267', 1, 2024, 'Nani', 'Perempuan', 51, 'S1', '20 tahun keatas', '[4,4,4,4,4,4,4,4,4,4,4]', '[3,3,3,3,3,3,3,3,3,3,3]'),
(137, 'PriKer-1721793728224', 1, 2024, 'Octavia', 'Perempuan', 27, 'D3', '< 10 tahun', '[4,4,4,4,4,4,4]', '[4,3,4,3,3,4,3]'),
(138, 'LeadBO-1721793790065', 1, 2024, 'Octavia', 'Perempuan', 27, 'D3', '< 10 tahun', '[4,4,4,4,4,4,4,4]', '[3,4,4,3,3,3,4,3]'),
(139, 'PeBO-1721793903966', 1, 2024, 'Octavia', 'Perempuan', 27, 'D3', '< 10 tahun', '[4,4,4,3,3,3,3,4,3,3,3,3,3,3,4,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3,2,3,3,2,3,3,2,3,3,3,3,3,3]'),
(140, 'SysBO-1721793954171', 1, 2024, 'Octavia', 'Perempuan', 27, 'D3', '< 10 tahun', '[4,3,3,3,3,4,3,3,3,3,3]', '[3,3,3,3,3,3,3,3,3,3,3]'),
(141, 'PriKer-1721794015440', 1, 2024, 'Priangga', 'Laki-laki', 30, 'D4', '< 10 tahun', '[4,4,4,4,4,4,4]', '[4,4,3,4,4,4,3]'),
(142, 'LeadBO-1721794058531', 1, 2024, 'Priangga', 'Laki-laki', 30, 'D4', '< 10 tahun', '[4,4,4,4,4,4,4,4]', '[3,3,4,4,3,3,3,3]'),
(143, 'PeBO-1721794144982', 1, 2024, 'Priangga', 'Laki-laki', 30, 'D4', '< 10 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,3,2,3,3,3,2,3,3,3,3,2,3,3,3,2,2,2,3,3,3]'),
(144, 'SysBO-1721794205528', 1, 2024, 'Priangga', 'Laki-laki', 30, 'D4', '< 10 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[2,3,4,4,3,4,3,3,3,3,3]'),
(145, 'PriKer-1721794249177', 1, 2024, 'Riska', 'Perempuan', 26, 'D4', '< 10 tahun', '[4,4,4,4,4,4,4]', '[3,4,3,3,3,4,4]'),
(146, 'LeadBO-1721794312311', 1, 2024, 'Riska', 'Perempuan', 26, 'D4', '< 10 tahun', '[4,4,4,4,4,4,4,4]', '[4,4,4,4,4,3,4,4]'),
(147, 'PeBO-1721794385316', 1, 2024, 'Riska', 'Perempuan', 26, 'D4', '< 10 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[2,3,3,3,4,4,3,4,2,3,3,3,3,3,3,3,3,2,3,3,3]'),
(148, 'SysBO-1721794459260', 1, 2024, 'Riska', 'Perempuan', 26, 'D4', '< 10 tahun', '[4,4,4,4,4,4,4,4,4,4,4]', '[2,2,3,3,3,4,3,3,4,4,4]'),
(149, 'PriKer-1721794500203', 1, 2024, 'Siti', 'Perempuan', 37, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4]'),
(150, 'LeadBO-1721794556752', 1, 2024, 'Siti', 'Perempuan', 37, 'D3', '10-15 tahun', '[4,4,3,4,4,4,4,4]', '[4,4,3,4,4,4,4,4]'),
(151, 'PeBO-1721794622323', 1, 2024, 'Siti', 'Perempuan', 37, 'D3', '10-15 tahun', '[3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]'),
(152, 'SysBO-1721794679719', 1, 2024, 'Siti', 'Perempuan', 37, 'D3', '10-15 tahun', '[3,4,4,4,4,4,4,4,4,4,4]', '[3,4,4,4,4,4,4,4,4,4,4]'),
(153, 'PriKer-1721794732775', 1, 2024, 'Tia', 'Laki-laki', 37, 'D3', '10-15 tahun', '[4,3,3,3,3,3,3]', '[4,3,3,4,3,3,3]'),
(154, 'LeadBO-1721794804746', 1, 2024, 'Tia', 'Laki-laki', 37, 'D3', '10-15 tahun', '[3,3,4,3,3,3,3,3]', '[3,3,3,4,3,3,3,3]'),
(155, 'PeBO-1721794941563', 1, 2024, 'Tia', 'Laki-laki', 37, 'D3', '10-15 tahun', '[3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,3,3,3,3,3,3]', '[3,3,4,3,3,3,3,3,3,3,3,3,3,3,4,4,3,3,3,3,3]'),
(156, 'SysBO-1721794992148', 1, 2024, 'Tia', 'Laki-laki', 37, 'D3', '10-15 tahun', '[3,4,3,3,3,3,3,3,3,3,3]', '[3,4,3,3,3,3,3,3,3,3,3]'),
(157, 'PriKer-1721795048011', 1, 2024, 'Tri Sulistyo', 'Laki-laki', 37, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4]', '[3,3,3,3,3,3,3]'),
(158, 'LeadBO-1721795107847', 1, 2024, 'Tri Sulistyo', 'Laki-laki', 37, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4]', '[3,3,3,3,3,3,3,3]'),
(159, 'PeBO-1721795188956', 1, 2024, 'Tri Sulistyo', 'Laki-laki', 37, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[3,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]'),
(160, 'SysBO-1721795252948', 1, 2024, 'Tri Sulistyo', 'Laki-laki', 37, 'S1', '10-15 tahun', '[4,4,4,4,4,4,4,4,4,3,3]', '[2,3,3,3,3,3,3,3,2,3,3]'),
(161, 'PriKer-1721795374407', 1, 2024, 'Tri Susilo', 'Laki-laki', 36, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4]', '[3,3,4,3,4,3,3]'),
(162, 'LeadBO-1721795398826', 1, 2024, 'Tri Susilo', 'Laki-laki', 36, 'D3', '10-15 tahun', '[4,4,4,4,4,4,4,4]', '[3,4,4,4,4,4,4,4]'),
(163, 'PeBO-1721795419368', 1, 2024, 'Tri Susilo', 'Laki-laki', 36, 'D3', '10-15 tahun', '[4,4,3,4,4,4,4,3,3,4,4,4,4,4,4,4,3,3,3,3,3]', '[4,3,3,4,3,4,4,3,3,4,3,3,4,4,4,4,3,3,3,3,3]'),
(164, 'SysBO-1721795436151', 1, 2024, 'Tri Susilo', 'Laki-laki', 36, 'D3', '10-15 tahun', '[3,4,4,3,3,3,3,4,3,3,3]', '[3,4,4,3,3,3,4,3,3,3,3]'),
(165, 'PriKer-1721795520330', 1, 2024, 'Vita', 'Perempuan', 30, 'S1', '10-15 tahun', '[3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3]'),
(166, 'LeadBO-1721795568287', 1, 2024, 'Vita', 'Perempuan', 30, 'S1', '10-15 tahun', '[3,3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3]'),
(167, 'PeBO-1721795629716', 1, 2024, 'Vita', 'Perempuan', 30, 'S1', '10-15 tahun', '[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]'),
(168, 'SysBO-1721795665028', 1, 2024, 'Vita', 'Perempuan', 30, 'S1', '10-15 tahun', '[3,3,3,3,3,3,3,3,3,3,3]', '[3,3,3,3,3,3,3,3,3,3,3]'),
(169, 'PriKer-1721795721981', 1, 2024, 'Yayan', 'Laki-laki', 51, 'S2', '20 tahun keatas', '[4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4]'),
(170, 'LeadBO-1721797069628', 1, 2024, 'Yayan', 'Laki-laki', 51, 'S2', '20 tahun keatas', '[4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4]'),
(171, 'PeBO-1721797208600', 1, 2024, 'Yayan', 'Laki-laki', 51, 'S2', '20 tahun keatas', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]'),
(172, 'SysBO-1721797269664', 1, 2024, 'Yayan', 'Laki-laki', 51, 'S2', '20 tahun keatas', '[4,4,4,4,4,4,4,4,4,4,4]', '[4,4,4,4,4,4,4,4,4,4,4]');

-- --------------------------------------------------------

--
-- Table structure for table `survey_pegawai_teladan`
--

CREATE TABLE `survey_pegawai_teladan` (
  `id_survey_p` int(10) NOT NULL,
  `nip` int(20) NOT NULL,
  `nama_lengkap` varchar(50) NOT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `umur` int(10) NOT NULL,
  `pendidikan` varchar(20) NOT NULL,
  `masa_kerja` varchar(10) NOT NULL,
  `nama_kandidat` varchar(50) NOT NULL,
  `pertanyaan_1` int(1) NOT NULL,
  `pertanyaan_2` int(1) NOT NULL,
  `pertanyaan_3` int(1) NOT NULL,
  `pertanyaan_4` int(1) NOT NULL,
  `pertanyaan_5` int(1) NOT NULL,
  `pertanyaan_6` int(1) NOT NULL,
  `pertanyaan_7` int(1) NOT NULL,
  `pertanyaan_8` int(1) NOT NULL,
  `pertanyaan_9` int(1) NOT NULL,
  `pertanyaan_10` int(1) NOT NULL,
  `pertanyaan_11` int(1) NOT NULL,
  `pertanyaan_12` int(1) NOT NULL,
  `pertanyaan_13` int(1) NOT NULL,
  `pertanyaan_14` int(1) NOT NULL,
  `pertanyaan_15` int(1) NOT NULL,
  `pertanyaan_16` int(1) NOT NULL,
  `pertanyaan_17` int(1) NOT NULL,
  `pertanyaan_18` int(1) NOT NULL,
  `pertanyaan_19` int(1) NOT NULL,
  `pertanyaan_20` int(1) NOT NULL,
  `pertanyaan_21` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `survey_pegawai_teladan`
--

INSERT INTO `survey_pegawai_teladan` (`id_survey_p`, `nip`, `nama_lengkap`, `jenis_kelamin`, `umur`, `pendidikan`, `masa_kerja`, `nama_kandidat`, `pertanyaan_1`, `pertanyaan_2`, `pertanyaan_3`, `pertanyaan_4`, `pertanyaan_5`, `pertanyaan_6`, `pertanyaan_7`, `pertanyaan_8`, `pertanyaan_9`, `pertanyaan_10`, `pertanyaan_11`, `pertanyaan_12`, `pertanyaan_13`, `pertanyaan_14`, `pertanyaan_15`, `pertanyaan_16`, `pertanyaan_17`, `pertanyaan_18`, `pertanyaan_19`, `pertanyaan_20`, `pertanyaan_21`) VALUES
(18, 0, 'Ir. Suhartono, M.P.', 'LK', 29, 'S3', '3 tahun', 'Kandidat 1', 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4),
(19, 0, 'Ir. Suhartono, M.P.', 'LK', 29, 'S3', '3 tahun', 'Kandidat 2', 4, 3, 4, 4, 2, 4, 4, 4, 4, 4, 4, 3, 4, 4, 2, 4, 2, 4, 4, 4, 4),
(20, 0, 'Ir. Suhartono, M.P.', 'LK', 29, 'S3', '3 tahun', 'Kandidat 3', 4, 3, 4, 4, 2, 4, 4, 4, 4, 3, 4, 3, 4, 4, 2, 4, 1, 4, 2, 4, 4),
(21, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Kandidat 3', 4, 3, 4, 4, 2, 4, 4, 4, 4, 3, 4, 3, 4, 4, 2, 4, 3, 4, 2, 4, 4),
(22, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Kandidat 3', 4, 3, 4, 4, 2, 4, 4, 4, 4, 3, 4, 3, 4, 4, 2, 4, 3, 4, 4, 4, 4),
(23, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Kandidat 1', 4, 3, 4, 4, 2, 4, 4, 4, 4, 3, 4, 3, 4, 4, 2, 4, 3, 4, 4, 4, 4),
(24, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Kandidat 1', 4, 3, 4, 4, 2, 4, 4, 4, 4, 3, 4, 3, 4, 4, 2, 4, 3, 4, 4, 4, 4),
(25, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Kandidat 2', 4, 3, 4, 4, 2, 4, 4, 4, 4, 3, 4, 3, 4, 4, 2, 4, 3, 4, 4, 4, 4),
(26, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Kandidat 2', 4, 3, 4, 4, 2, 4, 4, 4, 4, 3, 4, 3, 4, 4, 2, 4, 3, 4, 4, 4, 4),
(27, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Kandidat 1', 2, 3, 4, 4, 2, 4, 4, 4, 4, 3, 4, 3, 4, 4, 2, 4, 3, 4, 4, 4, 4),
(28, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Syihan', 2, 3, 4, 4, 2, 4, 4, 4, 4, 3, 4, 3, 4, 4, 2, 4, 3, 4, 4, 4, 4),
(29, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Syihan', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(30, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Syihan', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(31, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Syihan', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(32, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Syihan', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(33, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Syihan', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(34, 0, 'Kandidat 1', 'LK', 29, 'S3', '3 tahun', 'Syihan', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(35, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Syihan', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(36, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Syihan', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(37, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Syihan', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(38, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Syihan', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(39, 0, 'Syihann', 'LK', 29, 'S3', '3 tahun', 'Syihan', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(40, 0, 'Isna', 'LK', 29, 'S3', '3 tahun', 'Isna', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(41, 0, 'Isna', 'LK', 29, 'S3', '3 tahun', 'Isna', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(42, 0, 'Isna', 'LK', 29, 'S3', '3 tahun', 'Isna', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(43, 0, 'Isna', 'LK', 29, 'S3', '3 tahun', 'Isna', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(44, 0, 'Isna', 'LK', 29, 'S3', '3 tahun', 'Isna', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(45, 0, 'Isna', 'LK', 29, 'S3', '3 tahun', 'Novi', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(46, 0, 'Isna', 'LK', 29, 'S3', '3 tahun', 'Novi', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(47, 0, 'Isna', 'LK', 29, 'S3', '3 tahun', 'Novi', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(48, 0, 'Isna', 'LK', 29, 'S3', '3 tahun', 'Novi', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3),
(49, 0, 'Isna', 'LK', 29, 'S3', '3 tahun', 'Novi', 4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authentication`
--
ALTER TABLE `authentication`
  ADD PRIMARY KEY (`id_auth`),
  ADD KEY `nip` (`nip`);

--
-- Indexes for table `hasil_survey_leadbo`
--
ALTER TABLE `hasil_survey_leadbo`
  ADD PRIMARY KEY (`id_hasil_leadbo`),
  ADD KEY `id_pertanyaan` (`id_pertanyaan`);

--
-- Indexes for table `hasil_survey_pebo`
--
ALTER TABLE `hasil_survey_pebo`
  ADD PRIMARY KEY (`id_hasil_pebo`),
  ADD KEY `id_pertanyaan` (`id_pertanyaan`);

--
-- Indexes for table `hasil_survey_priker`
--
ALTER TABLE `hasil_survey_priker`
  ADD PRIMARY KEY (`id_hasil_priker`),
  ADD KEY `id_pertanyaan` (`id_pertanyaan`);

--
-- Indexes for table `hasil_survey_sysbo`
--
ALTER TABLE `hasil_survey_sysbo`
  ADD PRIMARY KEY (`id_hasil_sysbo`),
  ADD KEY `id_pertanyaan` (`id_pertanyaan`);

--
-- Indexes for table `indikator_leadership`
--
ALTER TABLE `indikator_leadership`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `indikator_people`
--
ALTER TABLE `indikator_people`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `indikator_perilaku`
--
ALTER TABLE `indikator_perilaku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `indikator_system`
--
ALTER TABLE `indikator_system`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konsep_dasar_hukum`
--
ALTER TABLE `konsep_dasar_hukum`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `list_model`
--
ALTER TABLE `list_model`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `list_nilai_inti`
--
ALTER TABLE `list_nilai_inti`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nilai_konversi_survey`
--
ALTER TABLE `nilai_konversi_survey`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nilai_tambah`
--
ALTER TABLE `nilai_tambah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`nip`);

--
-- Indexes for table `pertanyaan_leadership`
--
ALTER TABLE `pertanyaan_leadership`
  ADD PRIMARY KEY (`id_pertanyaan`);

--
-- Indexes for table `pertanyaan_people`
--
ALTER TABLE `pertanyaan_people`
  ADD PRIMARY KEY (`id_pertanyaan`);

--
-- Indexes for table `pertanyaan_perilaku`
--
ALTER TABLE `pertanyaan_perilaku`
  ADD PRIMARY KEY (`id_pertanyaan`);

--
-- Indexes for table `pertanyaan_system`
--
ALTER TABLE `pertanyaan_system`
  ADD PRIMARY KEY (`id_pertanyaan`);

--
-- Indexes for table `survey_budaya_organisasi`
--
ALTER TABLE `survey_budaya_organisasi`
  ADD PRIMARY KEY (`id_survey_b`),
  ADD UNIQUE KEY `label` (`label`);

--
-- Indexes for table `survey_pegawai_teladan`
--
ALTER TABLE `survey_pegawai_teladan`
  ADD PRIMARY KEY (`id_survey_p`),
  ADD KEY `nip` (`nip`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authentication`
--
ALTER TABLE `authentication`
  MODIFY `id_auth` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hasil_survey_leadbo`
--
ALTER TABLE `hasil_survey_leadbo`
  MODIFY `id_hasil_leadbo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `hasil_survey_pebo`
--
ALTER TABLE `hasil_survey_pebo`
  MODIFY `id_hasil_pebo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- AUTO_INCREMENT for table `hasil_survey_priker`
--
ALTER TABLE `hasil_survey_priker`
  MODIFY `id_hasil_priker` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `hasil_survey_sysbo`
--
ALTER TABLE `hasil_survey_sysbo`
  MODIFY `id_hasil_sysbo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT for table `indikator_perilaku`
--
ALTER TABLE `indikator_perilaku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konsep_dasar_hukum`
--
ALTER TABLE `konsep_dasar_hukum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `list_model`
--
ALTER TABLE `list_model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `list_nilai_inti`
--
ALTER TABLE `list_nilai_inti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nilai_konversi_survey`
--
ALTER TABLE `nilai_konversi_survey`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `nilai_tambah`
--
ALTER TABLE `nilai_tambah`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `pertanyaan_leadership`
--
ALTER TABLE `pertanyaan_leadership`
  MODIFY `id_pertanyaan` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pertanyaan_people`
--
ALTER TABLE `pertanyaan_people`
  MODIFY `id_pertanyaan` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `pertanyaan_perilaku`
--
ALTER TABLE `pertanyaan_perilaku`
  MODIFY `id_pertanyaan` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pertanyaan_system`
--
ALTER TABLE `pertanyaan_system`
  MODIFY `id_pertanyaan` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `survey_budaya_organisasi`
--
ALTER TABLE `survey_budaya_organisasi`
  MODIFY `id_survey_b` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `survey_pegawai_teladan`
--
ALTER TABLE `survey_pegawai_teladan`
  MODIFY `id_survey_p` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `authentication`
--
ALTER TABLE `authentication`
  ADD CONSTRAINT `authentication_ibfk_1` FOREIGN KEY (`nip`) REFERENCES `pegawai` (`nip`);

--
-- Constraints for table `hasil_survey_leadbo`
--
ALTER TABLE `hasil_survey_leadbo`
  ADD CONSTRAINT `hasil_survey_leadbo_ibfk_1` FOREIGN KEY (`id_pertanyaan`) REFERENCES `pertanyaan_leadership` (`id_pertanyaan`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `hasil_survey_pebo`
--
ALTER TABLE `hasil_survey_pebo`
  ADD CONSTRAINT `hasil_survey_pebo_ibfk_1` FOREIGN KEY (`id_pertanyaan`) REFERENCES `pertanyaan_people` (`id_pertanyaan`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `hasil_survey_priker`
--
ALTER TABLE `hasil_survey_priker`
  ADD CONSTRAINT `hasil_survey_priker_ibfk_1` FOREIGN KEY (`id_pertanyaan`) REFERENCES `pertanyaan_perilaku` (`id_pertanyaan`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `hasil_survey_sysbo`
--
ALTER TABLE `hasil_survey_sysbo`
  ADD CONSTRAINT `hasil_survey_sysbo_ibfk_1` FOREIGN KEY (`id_pertanyaan`) REFERENCES `pertanyaan_system` (`id_pertanyaan`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
